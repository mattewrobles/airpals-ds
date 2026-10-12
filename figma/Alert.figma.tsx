import figma from '@figma/code-connect'
import { Alert } from '../src/lib/Alert'

figma.connect(Alert, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=738-4426', {
  props: {
    useCase: figma.enum('use case', {
      warning: 'warning',
      success: 'success',
      info:    'info',
      error:   'error',
      alert:   'alert',
    }),
    border: figma.enum('border', { true: true, false: false }),
  },
  example: ({ useCase, border }) => (
    <Alert useCase={useCase} border={border} title="Alert title" />
  ),
})
