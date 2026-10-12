import figma from '@figma/code-connect'
import { Navbar } from '../src/lib/Navbar'

figma.connect(Navbar, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=536-240', {
  props: {
    mobile:    figma.enum('Mobile', { True: true, False: false }),
    collapsed: figma.enum('Collapsed', { True: true, False: false }),
  },
  example: ({ mobile, collapsed }) => (
    <Navbar mobile={mobile} collapsed={collapsed} />
  ),
})
