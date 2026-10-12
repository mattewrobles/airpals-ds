import figma from '@figma/code-connect'
import { Footer } from '../src/lib/Footer'

figma.connect(Footer, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-9228', {
  props: {},
  example: () => (
    <Footer />
  ),
})
