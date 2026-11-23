import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Rect, Transformer } from 'react-konva';
import { TextElement } from '@/types/kile';
import { DESIGN_FONTS } from '@/lib/design/fonts';

type DesignCanvasProps = {
    layers: TextElement[];
    activeLayerId: string|null;
    color:string|null;
    onUpdateLayer: (layer: TextElement) => void;
    onChangeActiveLayer:(id:string)=>void;
    onExportReady: (exportFn: () => Promise<Blob | null>) => void;
};

export default function DesignCanvas({
    layers,
    activeLayerId,
    color,
    onUpdateLayer,
    onChangeActiveLayer,
    onExportReady,
}: DesignCanvasProps) {

    const width = 590;
    const height = 226;
    const lineGap = 20;


    const [isClickedOnEmpty, setIsClickedOnEmpty] = useState(false);
    function handleChangeLayer(id:string){
        onChangeActiveLayer(id);
        setIsClickedOnEmpty(false);
    }
    const textRefs = useRef<Record<string, Konva.Text | null>>({});
    const transformerRef = useRef<Konva.Transformer>(null);
    const layerRef = useRef<Konva.Layer>(null);

    const totalHeight = layers.reduce(
        (total, layer) => total + (layer.fontSize ?? 24) + lineGap,
        0
    ) - lineGap;

    let currentY = (height - totalHeight) / 2;
    const fontsToLoad = layers.map((layer) => {
        const selectedFont = DESIGN_FONTS.find(
            (font) => font.value === layer.fontFamily
        );
    
        return {
            fontFamily: selectedFont?.fontFamily ?? 'Arial',
            fontSize: layer.fontSize ?? 24,
        };
    });

    useEffect(() => {
        const transformer = transformerRef.current;
        const selectedNode = !isClickedOnEmpty && activeLayerId
            ? textRefs.current[activeLayerId]
            : null;

        if (transformer) {
            transformer.nodes(selectedNode ? [selectedNode] : []);
            transformer.getLayer()?.batchDraw();
        }
    }, [isClickedOnEmpty, activeLayerId, layers]);
    useEffect(() => {
        const loadFonts = async () => {
            const uniqueFonts = new Set(
                fontsToLoad.map(
                    ({ fontFamily, fontSize }) =>
                        `${fontSize}px "${fontFamily}"`
                )
            );
    
            await Promise.all(
                [...uniqueFonts].map((font) =>
                    document.fonts.load(font)
                )
            );
    
            layerRef.current?.batchDraw();
        };
    
        loadFonts();
    }, [fontsToLoad.map(font => `${font.fontFamily}-${font.fontSize}`).join('|')]);

    const exportDesign = async (): Promise<Blob | null> => {
        const stage = layerRef.current?.getStage();
    
        if (!stage) return null;
    
        const background = stage.findOne('.canvas-background');
        const transformer = stage.findOne('Transformer');
    
        try {
            background?.hide();
            transformer?.hide();
            stage.batchDraw();
    
            return await new Promise((resolve) => {
                stage.toCanvas().toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            });
        } finally {
            background?.show();
            transformer?.show();
            stage.batchDraw();
        }
    };
    useEffect(() => {
        onExportReady(exportDesign);
    }, [onExportReady, layers, color]);
    return (
        <Stage
            width={width}
            height={height}
            onMouseDown={(e) => {
                const clickedOnEmpty =
                    e.target === e.target.getStage() ||
                    e.target.name() === 'canvas-background';

                if (clickedOnEmpty) {
                    setIsClickedOnEmpty(true);
                }
            }}
            onTouchStart={(e) => {
                const clickedOnEmpty =
                    e.target === e.target.getStage() ||
                    e.target.name() === 'canvas-background';

                if (clickedOnEmpty) {
                    setIsClickedOnEmpty(true);
                }
            }}
        >
            <Layer ref={layerRef}>
                <Rect
                    name="canvas-background"
                    width={width}
                    height={height}
                    fill="#F1EAE1"
                    stroke="#122D28"
                    strokeWidth={1}
                    dash={[5, 5]}
                    listening
                />

                {layers.map((layer) => {
                    const fontSize = layer.fontSize ?? 24;
                    const defaultY = currentY + fontSize / 2;
                    const selectedFont = DESIGN_FONTS.find(
                        (font) => font.value === layer.fontFamily
                    );

                    currentY += fontSize + lineGap;

                    return (
                        <Text
                            key={layer.id}
                            ref={(node) => {
                                textRefs.current[layer.id] = node;

                                if (node) {
                                    node.offsetX(node.width() / 2);
                                    node.offsetY(node.height() / 2);
                                }
                            }}
                            text={layer.text}
                            x={layer.x ?? width / 2}
                            y={layer.y ?? defaultY}
                            fontSize={fontSize}
                            fontFamily={selectedFont?.fontFamily ?? 'Arial'}
                            fontStyle={
                                [
                                    layer.style?.includes('bold') ? 'bold' : '',
                                    layer.style?.includes('italic') ? 'italic' : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ') || 'normal'
                            }
                            textDecoration={
                                layer.style?.includes('underline') ? 'underline' : ''
                            }
                            fill={color ?? '#000000'}
                            align="center"
                            draggable
                            onClick={() => handleChangeLayer(layer.id)}
                            onTap={() => handleChangeLayer(layer.id)}
                            onDragMove={(e) => {
                                const node = e.target;

                                const halfWidth = node.width() / 2;
                                const halfHeight = node.height() / 2;

                                node.x(
                                    Math.max(
                                        halfWidth,
                                        Math.min(width - halfWidth, node.x())
                                    )
                                );

                                node.y(
                                    Math.max(
                                        halfHeight,
                                        Math.min(height - halfHeight, node.y())
                                    )
                                );
                            }}
                            onDragEnd={(e) => {
                                onUpdateLayer({
                                    ...layer,
                                    x: e.target.x(),
                                    y: e.target.y(),
                                });
                            }}
                            onTransformEnd={(e) => {
                                const node = e.target;

                                const scaleX = node.scaleX();

                                const newFontSize = Math.max(
                                    6,
                                    Math.round(fontSize * scaleX)
                                );

                                node.scaleX(1);
                                node.scaleY(1);

                                onUpdateLayer({
                                    ...layer,
                                    x: node.x(),
                                    y: node.y(),
                                    fontSize: newFontSize,
                                });
                            }}
                        />
                    );
                })}

                <Transformer
                    ref={transformerRef}
                    rotateEnabled={true}
                    keepRatio
                    enabledAnchors={[
                        'top-left',
                        'top-right',
                        'bottom-left',
                        'bottom-right',
                    ]}
                    boundBoxFunc={(oldBox, newBox) => {
                        const isOutside =
                            newBox.x < 0 ||
                            newBox.y < 0 ||
                            newBox.x + newBox.width > width ||
                            newBox.y + newBox.height > height;

                        if (isOutside || newBox.width < 10 || newBox.height < 10) {
                            return oldBox;
                        }

                        return newBox;
                    }}
                />
            </Layer>
        </Stage>
    );
}
