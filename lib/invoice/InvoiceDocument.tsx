
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

  // Only true for test invoices
  isExample?: boolean;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 65,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#303B37',
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    backgroundColor: '#122D28',
    paddingVertical: 17,
    paddingHorizontal: 24,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    color: '#F5F1E8',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
  },

  brandSubtitle: {
    color: '#C8D0C8',
    fontSize: 8,
    marginTop: 4,
    letterSpacing: 1.5,
  },

  headerInvoice: {
    color: '#F5F1E8',
    fontSize: 19,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },

  example: {
    color: '#9A6B34',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    marginBottom: 14,
  },

  // Layout
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: {
    width: '47%',
  },

  sectionLabel: {
    fontSize: 8,
    color: '#8B918D',
    letterSpacing: 1,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },

  companyName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    color: '#122D28',
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
    marginVertical: 17,
  },

  // Invoice details
  invoiceInfo: {
    alignItems: 'flex-end',
  },

  invoiceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },

  invoiceInfoLabel: {
    color: '#777F79',
    fontSize: 9,
  },

  invoiceInfoValue: {
    color: '#303B37',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },

  // Product table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2F1EE',
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#122D28',
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 11,
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

  // Totals
  totals: {
    width: '55%',
    marginLeft: 'auto',
    marginTop: 20,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
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
    paddingTop: 12,
  },

  grandTotalLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#122D28',
  },

  grandTotalValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#122D28',
  },

  // Payment
  payment: {
    marginTop: 32,
    padding: 17,
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

  paymentRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  paymentLabel: {
    width: 135,
    fontSize: 9,
    color: '#777F79',
  },

  paymentValue: {
    flex: 1,
    fontSize: 9,
    color: '#303B37',
  },

  paymentNote: {
    fontSize: 8,
    color: '#777F79',
    marginTop: 8,
    lineHeight: 1.4,
  },

  latePayment: {
    fontSize: 8,
    color: '#777F79',
    marginTop: 14,
    lineHeight: 1.4,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 27,
    left: 42,
    right: 42,
    borderTopWidth: 1,
    borderTopColor: '#EAE9E5',
    paddingTop: 10,
    textAlign: 'center',
  },

  footerText: {
    fontSize: 8,
    color: '#999999',
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
  // Prices in the product table are excluding VAT.
  const unitPrice = 3.5 / 1.25;
  const productAmount = data.quantity * unitPrice;

  // Stamp fee is charged only on the first order.
  const stampFee = data.isRepeatOrder ? 0 : 150 / 1.25;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Vipperbordet</Text>
            <Text style={styles.brandSubtitle}>
              GREYDOT
            </Text>
          </View>

          <Text style={styles.headerInvoice}>
            FAKTURA
          </Text>
        </View>

        {data.isExample && (
          <Text style={styles.example}>
            EKSEMPEL – IKKE EN GYLDIG FAKTURA
          </Text>
        )}

        {/* Seller and invoice information */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>
              SÆLGER
            </Text>

            <Text style={styles.companyName}>
              Greydot v/Roland Thorsen
            </Text>

            <Text style={styles.detail}>
              J. Skjoldborgs Vej 57
            </Text>

            <Text style={styles.detail}>
              8230 Åbyhøj
            </Text>

            <Text style={styles.detail}>
              Danmark
            </Text>

            <Text style={styles.detail}>
              CVR-nr. 34399131
            </Text>
          </View>

          <View style={[styles.column, styles.invoiceInfo]}>
            <Text style={styles.sectionLabel}>
              FAKTURAOPLYSNINGER
            </Text>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>
                Fakturanr.
              </Text>
              <Text style={styles.invoiceInfoValue}>
                {data.invoiceNumber}
              </Text>
            </View>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>
                Fakturadato
              </Text>
              <Text style={styles.invoiceInfoValue}>
                {data.invoiceDate}
              </Text>
            </View>

            <View style={styles.invoiceInfoRow}>
              <Text style={styles.invoiceInfoLabel}>
                Forfaldsdato
              </Text>
              <Text style={styles.invoiceInfoValue}>
                {data.dueDate}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Customer */}
        <View>
          <Text style={styles.sectionLabel}>
            FAKTURERET TIL
          </Text>

          <Text style={styles.companyName}>
            {data.companyName}
          </Text>

          <Text style={styles.detail}>
            {data.address}
          </Text>

          <Text style={styles.detail}>
            {data.postalCode} {data.city}
          </Text>

          <Text style={styles.detail}>
            Danmark
          </Text>

          {data.cvr && (
            <Text style={styles.detail}>
              CVR-nr. {data.cvr}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Order details */}
        <Text style={styles.sectionLabel}>
          ORDREDETALJER
        </Text>

        <View style={styles.tableHeader}>
          <Text style={styles.number}>Nr.</Text>
          <Text style={styles.description}>Tekst</Text>
          <Text style={styles.quantity}>Antal</Text>
          <Text style={styles.unit}>Enhed</Text>
          <Text style={styles.unitPrice}>Stk. pris</Text>
          <Text style={styles.amount}>Pris</Text>
        </View>

        {/* Product */}
        <View style={styles.tableRow}>
          <Text style={styles.number}>1</Text>

          <Text style={styles.description}>
            Bordkile
          </Text>

          <Text style={styles.quantity}>
            {data.quantity}
          </Text>

          <Text style={styles.unit}>
            Stk.
          </Text>

          <Text style={styles.unitPrice}>
            {formatPrice(unitPrice)}
          </Text>

          <Text style={styles.amount}>
            {formatPrice(productAmount)}
          </Text>
        </View>

        {/* Stamp fee - first order only */}
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
            <Text style={styles.totalLabel}>
              25,00% moms
            </Text>

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
        </View>

        {/* Payment information */}
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
            <Text style={styles.paymentLabel}>
              Bank
            </Text>
            <Text style={styles.paymentValue}>
              Sydbank
            </Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>
              Reg.nr.
            </Text>
            <Text style={styles.paymentValue}>
              XXXX
            </Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>
              Kontonummer
            </Text>
            <Text style={styles.paymentValue}>
              XXXX
            </Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>
              Betalingsfrist
            </Text>
            <Text style={styles.paymentValue}>
              Netto 14 dage – forfald {data.dueDate}
            </Text>
          </View>

          <Text style={styles.paymentNote}>
            Fakturanr. {data.invoiceNumber} bedes anført
            ved bankoverførsel.
          </Text>

          <Text style={styles.latePayment}>
            Ved for sen betaling påregnes rente i henhold
            til gældende lovgivning.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Greydot v/Roland Thorsen · J. Skjoldborgs Vej 57
            · 8230 Åbyhøj · CVR-nr. 34399131
          </Text>

          <Text style={styles.footerText}>
            vipperbordet.dk
          </Text>
        </View>

      </Page>
    </Document>
  );
}
