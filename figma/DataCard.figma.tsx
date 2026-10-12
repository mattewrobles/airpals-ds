import figma from '@figma/code-connect'
import { DataCard } from '../src/lib/DataCard'

figma.connect(DataCard, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=745-9014', {
  props: {
    layout: figma.enum('Layout', {
      Vertical:   'vertical',
      Normal:     'normal',
      Horizontal: 'horizontal',
    }),
    title:   figma.string('Title#745:4'),
    content: figma.string('Content#745:7'),
    data:    figma.string('Data#745:10'),
  },
  example: ({ layout, title, content, data }) => (
    <DataCard layout={layout} title={title} content={content} data={data} />
  ),
})
