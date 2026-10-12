import figma from '@figma/code-connect'
import { TableHeader } from '../src/lib/Table'

figma.connect(TableHeader, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-59653', {
  props: {
    type: figma.enum('Type', {
      Empty:    'empty',
      Checkbox: 'checkbox',
      Toggle:   'toggle',
      Number:   'number',
      Text:     'text',
      Tree:     'tree',
    }),
    size:    figma.enum('Sizes', { Small: 'sm', Large: 'lg' }),
    text:    figma.string('↳ Text#1376:14'),
    sorting: figma.boolean('Sorting#1425:7'),
    filter:  figma.boolean('Filter#1425:0'),
  },
  example: ({ type, size, text, sorting, filter }) => (
    <TableHeader type={type} size={size} sorting={sorting} filter={filter}>{text}</TableHeader>
  ),
})
