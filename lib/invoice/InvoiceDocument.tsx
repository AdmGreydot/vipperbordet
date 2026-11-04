
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
  } from '@react-pdf/renderer';
  
  export type InvoiceData = {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
  
    companyName: string;
    cvr: string;
    address: string;
    postalCode: string;
    city: string;
  
    quantity: number;
    isRepeatOrder: boolean;
  
    subtotal: number;
    vat: number;
    total: number;
  };
  
  const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        paddingBottom: 38,
        paddingHorizontal: 42,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#303B37',
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#122D28',
        paddingVertical: 16,
        paddingHorizontal: 26,
        marginBottom: 24,
      },
      
    brand: {
        color: '#F5F1E8',
        fontSize: 21,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: -0.5,
    },
      
    brandSubtitle: {
        color: '#C8D0C8',
        fontSize: 9,
        marginTop: 5,
        letterSpacing: 1.5,
    },
    invoiceTitle: {
      fontSize: 25,
      fontFamily: 'Helvetica-Bold',
      color: '#122D28',
      marginBottom: 20,
    },
  
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    column: {
      width: '48%',
    },
  
    sectionLabel: {
      fontSize: 8,
      color: '#8B918D',
      letterSpacing: 1,
      marginBottom: 8,
      fontFamily: 'Helvetica-Bold',
    },
  
    companyName: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 5,
    },
  
    detail: {
      fontSize: 9,
      color: '#666E69',
      marginBottom: 4,
      lineHeight: 1.4,
    },
  
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAE9E5',
        marginVertical: 16,
    },
  
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#F2F1EE',
      padding: 11,
      color: '#122D28',
      fontFamily: 'Helvetica-Bold',
      fontSize: 9,
    },
  
    tableRow: {
        flexDirection: 'row',
        padding: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#EAE9E5',
    },
  
    description: {
      flex: 1,
    },
  
    quantity: {
      width: 65,
      textAlign: 'center',
    },
  
    amount: {
      width: 95,
      textAlign: 'right',
    },
  
    totals: {
      width: '55%',
      marginLeft: 'auto',
      marginTop: 20,
    },
  
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 7,
    },
  
    totalLabel: {
      color: '#777F79',
      fontSize: 9,
    },
  
    totalValue: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
    },
  
    grandTotal: {
      borderTopWidth: 1,
      borderTopColor: '#C49A68',
      marginTop: 8,
      paddingTop: 13,
    },
  
    grandTotalLabel: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: '#122D28',
    },
  
    grandTotalValue: {
      fontSize: 17,
      fontFamily: 'Helvetica-Bold',
      color: '#122D28',
    },
  
    payment: {
      marginTop: 32,
      padding: 18,
      backgroundColor: '#F5F4F0',
      borderLeftWidth: 3,
      borderLeftColor: '#C49A68',
    },
  
    paymentTitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: '#122D28',
      letterSpacing: 1,
      marginBottom: 12,
    },
  
    footer: {
      position: 'absolute',
      bottom: 28,
      left: 48,
      right: 48,
      borderTopWidth: 1,
      borderTopColor: '#EAE9E5',
      paddingTop: 10,
      textAlign: 'center',
    },
  
    footerText: {
      fontSize: 8,
      color: '#999999',
    },
  
    example: {
      color: '#9A6B34',
      fontSize: 8,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 1,
      marginBottom: 10,
    },
  });
  
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('da-DK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' kr.';
  
  export default function InvoiceDocument({
    data,
  }: {
    data: InvoiceData;
  }) {
    const stampFee = data.isRepeatOrder ? 0 : 150;
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
  
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brand}>Vipperbordet</Text>
            <Text style={styles.brandSubtitle}>FAKTURA</Text>
          </View>
  
          <Text style={styles.example}>
            EKSEMPEL – IKKE EN GYLDIG FAKTURA
          </Text>
  
  
          {/* Seller and invoice details */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionLabel}>SÆLGER</Text>
              <Text style={styles.companyName}>
                Greydot v/Roland Thorsen
              </Text>
              <Text style={styles.detail}>J. Skjoldborgs Vej 57</Text>
              <Text style={styles.detail}>8230 Åbyhøj</Text>
              <Text style={styles.detail}>CVR: 34399131</Text>
            </View>
  
            <View style={styles.column}>
              <Text style={styles.sectionLabel}>FAKTURAOPLYSNINGER</Text>
              <Text style={styles.detail}>
                Faktura nr.: {data.invoiceNumber}
              </Text>
              <Text style={styles.detail}>
                Fakturadato: {data.invoiceDate}
              </Text>
              <Text style={styles.detail}>
                Forfaldsdato: {data.dueDate}
              </Text>
            </View>
          </View>
  
          <View style={styles.divider} />
  
          {/* Customer */}
          <Text style={styles.sectionLabel}>FAKTURERET TIL</Text>
          <Text style={styles.companyName}>{data.companyName}</Text>
          <Text style={styles.detail}>
            {data.address}
          </Text>
          <Text style={styles.detail}>
            {data.postalCode} {data.city}
          </Text>
          <Text style={styles.detail}>CVR: {data.cvr}</Text>
  
          <View style={styles.divider} />
  
          {/* Product table */}
          <Text style={styles.sectionLabel}>ORDREDETALJER</Text>
  
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Beskrivelse</Text>
            <Text style={styles.quantity}>Antal</Text>
            <Text style={styles.amount}>Beløb</Text>
          </View>
  
          <View style={styles.tableRow}>
            <Text style={styles.description}>Bordkile</Text>
            <Text style={styles.quantity}>{data.quantity}</Text>
            <Text style={styles.amount}>
              {formatPrice(data.quantity * 3.5)}
            </Text>
          </View>
  
          {stampFee > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.description}>Stempelgebyr</Text>
              <Text style={styles.quantity}>1</Text>
              <Text style={styles.amount}>
                {formatPrice(stampFee)}
              </Text>
            </View>
          )}
  
          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Subtotal ekskl. moms
              </Text>
              <Text style={styles.totalValue}>
                {formatPrice(data.subtotal)}
              </Text>
            </View>
  
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Moms (25%)</Text>
              <Text style={styles.totalValue}>
                {formatPrice(data.vat)}
              </Text>
            </View>
  
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.grandTotalLabel}>
                TOTAL INKL. MOMS
              </Text>
              <Text style={styles.grandTotalValue}>
                {formatPrice(data.total)}
              </Text>
            </View>
          </View>
  
          {/* Payment */}
          <View style={styles.payment}>
            <Text style={styles.paymentTitle}>
              BETALINGSOPLYSNINGER
            </Text>
            <Text style={styles.detail}>
              Betalingsmetode: Bankoverførsel
            </Text>
            <Text style={styles.detail}>
              Bank: AL SYDBANK A/S
            </Text>
            <Text style={styles.detail}>
              Reg.nr.: XXXX
            </Text>
            <Text style={styles.detail}>
              Kontonummer: XXXX
            </Text>
            <Text style={styles.detail}>
              Betalingsfrist: 14 dage
            </Text>
          </View>
  
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Greydot v/Roland Thorsen · CVR 34399131 · vipperbordet.dk
            </Text>
          </View>
  
        </Page>
      </Document>
    );
  }
  