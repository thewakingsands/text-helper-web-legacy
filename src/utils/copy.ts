import copyText from 'copy-text-to-clipboard'
import { showToast } from './toaster'

export function copy(text: string) {
  if (copyText(text)) {
    void showToast(`已复制 ${text}`)
  } else {
    prompt('请复制', text)
  }
}
