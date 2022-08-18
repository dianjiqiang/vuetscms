import { ref } from 'vue'
import pageModel from '../components/page-model'

type CallbackFn = (item?: any) => void

export function usePageModel(editCb?: CallbackFn, newCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()

  const defaultInfo = ref({})
  const editBtnClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  const newBtnClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  return { defaultInfo, pageModelRef, editBtnClick, newBtnClick }
}
