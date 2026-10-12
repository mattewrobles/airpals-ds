import figma from '@figma/code-connect'
import { FeedbackDialog } from '../src/lib/FeedbackDialog'

figma.connect(FeedbackDialog, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=741-40256', {
  props: {
    title:       figma.string('↳ Title #27873:3'),
    description: figma.string('↳ Description#27873:15'),
    showHeader:  figma.boolean('Header#9:0'),
    showFooter:  figma.boolean('Footer#9:2'),
  },
  example: ({ title, description, showHeader, showFooter }) => (
    <FeedbackDialog
      title={title}
      description={description}
      showHeader={showHeader}
      showFooter={showFooter}
      onClose={() => {}}
    />
  ),
})
