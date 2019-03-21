import copyText from 'copy-text-to-clipboard'
import { toaster } from './toaster'

export function copy(text: string) {
  if (copyText(text)) {
    toaster.show({
      intent: 'success',
      message: `已复制 ${text}`
    })
  } else {
    prompt('请复制', text)
  }
}
