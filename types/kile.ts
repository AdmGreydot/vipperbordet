export type TextElement = {
    id: string,
    text: string,
    fontFamily?: string,
    fontSize?: number,
    style?:('bold'|'italic'|'underline')[],
    x?: number,
    y?: number,
}
export type NewTextElement = Omit<TextElement,"id">