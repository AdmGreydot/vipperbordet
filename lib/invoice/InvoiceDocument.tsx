
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
    paddingTop: 28,
    paddingBottom: 48,
    paddingHorizontal: 38,
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#303B37',
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: '#122D28',
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginBottom: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    color: '#F5F1E8',
    fontSize: 21,
    fontFamily: 'Helvetica-Bold',
  },

  brandSubtitle: {
    color: '#C8D0C8',
    fontSize: 7,
    marginTop: 3,
    letterSpacing: 1.5,
  },

  headerInvoice: {
    color: '#F5F1E8',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: {
    width: '31.5%',
  },

  sectionLabel: {
    fontSize: 7,
    color: '#8B918D',
    letterSpacing: 0.8,
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },

  companyName: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#122D28',
  },

  detail: {
    fontSize: 7.5,
    color: '#666E69',
    marginBottom: 3,
    lineHeight: 1.25,
  },

  invoiceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  invoiceInfoLabel: {
    color: '#777F79',
    fontSize: 7.5,
  },

  invoiceInfoValue: {
    color: '#303B37',
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAE9E5',
    marginVertical: 12,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2F1EE',
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: '#122D28',
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EAE9E5',
    alignItems: 'center',
  },

  number: {
    width: 25,
  },

  description: {
    flex: 1,
    paddingRight: 5,
  },

  quantity: {
    width: 42,
    textAlign: 'right',
  },

  unit: {
    width: 42,
    textAlign: 'center',
  },

  unitPrice: {
    width: 75,
    textAlign: 'right',
  },

  amount: {
    width: 80,
    textAlign: 'right',
  },

  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },

  payment: {
    width: '53%',
    padding: 12,
    backgroundColor: '#F5F4F0',
    borderLeftWidth: 3,
    borderLeftColor: '#C49A68',
  },

  paymentTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#122D28',
    letterSpacing: 0.7,
    marginBottom: 8,
  },

  paymentRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  paymentLabel: {
    width: 100,
    fontSize: 7.5,
    color: '#777F79',
  },

  paymentValue: {
    flex: 1,
    fontSize: 7.5,
    color: '#303B37',
  },

  paymentNote: {
    fontSize: 7,
    color: '#777F79',
    marginTop: 6,
    lineHeight: 1.3,
  },

  totals: {
    width: '42%',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  totalLabel: {
    color: '#777F79',
    fontSize: 8,
  },

  totalValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },

  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: '#C49A68',
    marginTop: 6,
    paddingTop: 9,
  },

  grandTotalLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#122D28',
  },

  grandTotalValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#122D28',
  },

  latePayment: {
    fontSize: 7,
    color: '#777F79',
    marginTop: 8,
    lineHeight: 1.3,
  },

  footer: {
    position: 'absolute',
    bottom: 22,
    left: 38,
    right: 38,
    borderTopWidth: 1,
    borderTopColor: '#EAE9E5',
    paddingTop: 8,
    textAlign: 'center',
  },

  footerText: {
    fontSize: 7,
    color: '#999999',
    marginBottom: 3,
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
  // Prices excluding VAT
  const unitPrice = 3.5 / 1.25;
  const productAmount = data.quantity * unitPrice;

  // Stamp fee applies only to the first order
  const stampFee = data.isRepeatOrder ? 0 : 150 / 1.25;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Vipperbordet</Text>
            <Text style={styles.brandSubtitle}>GREYDOT</Text>
          </View>

          <Text style={styles.headerInvoice}>FAKTURA</Text>
        </View>

        {/* Seller, customer and invoice information */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>SÆLGER</Text>

            <Text style={styles.companyName}>
              Greydot v/Roland Thorsen
            </Text>

            <Text style={styles.detail}>
              J. Skjoldborgs Vej 57
            </Text>
            <Text style={styles.detail}>8230 Åbyhøj</Text>
            <Text style={styles.detail}>Danmark</Text>
            <Text style={styles.detail}>CVR-nr. 34399131</Text>
            <Text style={styles.detail}>+45 22 58 41 42</Text>
            <Text style={styles.detail}>kontakt@greydot.dk</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionLabel}>FAKTURERET TIL</Text>

            <Text style={styles.companyName}>
              {data.companyName}
            </Text>

            <Text style={styles.detail}>{data.address}</Text>
            <Text style={styles.detail}>
              {data.postalCode} {data.city}
            </Text>
            <Text style={styles.detail}>Danmark</Text>

            {data.cvr && (
              <Text style={styles.detail}>
                CVR-nr. {data.cvr}
              </Text>
            )}
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionLabel}>
              FAKTURAOPLYSNINGER
            </Text>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>Fakturanr.</Text>
              <Text style={styles.invoiceInfoValue}>
                {data.invoiceNumber}
              </Text>
            </View>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>Fakturadato</Text>
              <Text style={styles.invoiceInfoValue}>
                {data.invoiceDate}
              </Text>
            </View>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>Forfaldsdato</Text>
              <Text style={styles.invoiceInfoValue}>
                {data.dueDate}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Order details */}
        <Text style={styles.sectionLabel}>ORDREDETALJER</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.number}>Nr.</Text>
          <Text style={styles.description}>Tekst</Text>
          <Text style={styles.quantity}>Antal</Text>
          <Text style={styles.unit}>Enhed</Text>
          <Text style={styles.unitPrice}>Stk. pris</Text>
          <Text style={styles.amount}>Pris</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.number}>1</Text>
          <Text style={styles.description}>Bordkile</Text>
          <Text style={styles.quantity}>{data.quantity}</Text>
          <Text style={styles.unit}>Stk.</Text>
          <Text style={styles.unitPrice}>
            {formatPrice(unitPrice)}
          </Text>
          <Text style={styles.amount}>
            {formatPrice(productAmount)}
          </Text>
        </View>

        {stampFee > 0 && (
          <View style={styles.tableRow}>
            <Text style={styles.number}>2</Text>
            <Text style={styles.description}>
              Oprettelse af personligt stempel
            </Text>
            <Text style={styles.quantity}>1</Text>
            <Text style={styles.unit}>Stk.</Text>
            <Text style={styles.unitPrice}>
              {formatPrice(stampFee)}
            </Text>
            <Text style={styles.amount}>
              {formatPrice(stampFee)}
            </Text>
          </View>
        )}

        {/* Totals and payment information */}
        <View style={styles.bottomSection}>
          <View style={styles.payment}>
            <Text style={styles.paymentTitle}>
              BETALINGSBETINGELSER
            </Text>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>
                Betalingsmetode
              </Text>
              <Text style={styles.paymentValue}>
                Bankoverførsel
              </Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Bank</Text>
              <Text style={styles.paymentValue}>Sydbank</Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Reg.nr.</Text>
              <Text style={styles.paymentValue}>7110</Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Kontonummer</Text>
              <Text style={styles.paymentValue}>0001395714</Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Betalingsfrist</Text>
              <Text style={styles.paymentValue}>
                Netto 14 dage – forfald {data.dueDate}
              </Text>
            </View>

            <Text style={styles.paymentNote}>
              Fakturanr. {data.invoiceNumber} bedes anført
              ved bankoverførsel.
            </Text>
          </View>

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
              <Text style={styles.totalLabel}>25,00% moms</Text>
              <Text style={styles.totalValue}>
                {formatPrice(data.vat)}
              </Text>
            </View>

            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.grandTotalLabel}>
                TOTAL DKK
              </Text>
              <Text style={styles.grandTotalValue}>
                {formatPrice(data.total)}
              </Text>
            </View>

            <Text style={styles.latePayment}>
              Ved for sen betaling påregnes rente i henhold
              til gældende lovgivning.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Greydot v/Roland Thorsen · J. Skjoldborgs Vej 57
            · 8230 Åbyhøj · CVR-nr. 34399131
          </Text>

          <Text style={styles.footerText}>
            kontakt@greydot.dk · +45 22 58 41 42 · vipperbordet.dk
          </Text>
        </View>
      </Page>
    </Document>
  );
}
