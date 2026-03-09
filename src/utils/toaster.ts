import { OverlayToaster, Position, type Toaster } from '@blueprintjs/core'

let toasterPromise: Promise<Toaster> | null = null

function getToaster() {
  if (!toasterPromise) {
    toasterPromise = OverlayToaster.create({
      position: Position.TOP
    })
  }

  return toasterPromise
}

export async function showToast(message: string) {
  const toaster = await getToaster()

  toaster.show({
    intent: 'success',
    message
  })
}
