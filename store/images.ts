import { defineStore } from 'pinia'
import { _Null } from '@/interfaces/interfaces'
import { Applicant, WardsApplicant } from '@/interfaces/interfaces'
import { FileWithAplType } from '@/interfaces/interfaces'
import useErrorHandle from '@/composables/useErrorHandle'

export const useImageStore = defineStore('image', () => {
  const { $SB } = useNuxtApp()
  const files = ref<FileWithAplType[]>([])
  const uploading = ref<boolean>(false)
  const primePath = ref<_Null<string[] | undefined>>(null)
  const secPath = ref<_Null<string[]>>(null)
  const wardsPath = ref<_Null<string[]>>(null)
  const primeIMG = ref<File>()
  const secIMG = ref<File>()

  function setFiles(file: FileWithAplType, type: string) {
    if (type === 'prime') {
      primeIMG.value = file
    } else if (type === 'sec') {
      secIMG.value = file
    } else {
    }

    // type -> the kind of apl being saved
    file.apl_type = type
    const updatedFiles = files.value.filter(x => x.apl_type !== file.apl_type)
    updatedFiles.push(file)
    files.value = updatedFiles
  }

  function removeFile(): void {
    if (has_files.value) {
      const updatedFiles = files.value.filter(x => x.apl_type !== 'sec')
      files.value = updatedFiles
    }
  }

  const has_files = computed(() => {
    if (files.value.length != 0) return true
    return false
  })

  async function uploadFiles(uuid: any) {
    let paths: string[] = []
    for (const file of files.value) {
      paths.push(await uploadAplImg(uuid, file))
    }
    console.log(paths)

    primePath.value = paths.filter(path => {
      if (path.includes('prime')) {
        return path
      }
    })
    secPath.value = paths.filter(path => {
      if (path.includes('sec')) {
        return path
      }
    })
    wardsPath.value = paths.filter(path => {
      if (path.includes('ward')) {
        return path
      }
    })

    resetFiles()

    return {
      primePath: primePath.value,
      secPath: secPath.value,
      wardsPath: wardsPath.value,
    }
  }

  async function updateFile(path: string) {
    let paths: string[] = []
    for (const file of files.value) {
      paths.push(await updateSingleAplImg(path))
    }

    primePath.value = paths.filter(path => {
      if (path.includes('prime')) {
        return path
      }
    })
    secPath.value = paths.filter(path => {
      if (path.includes('sec')) {
        return path
      }
    })
    wardsPath.value = paths.filter(path => {
      if (path.includes('ward')) {
        return path
      }
    })
    files.value = []

    console.log({
      primePath: primePath.value,
      secPath: secPath.value,
      wardsPath: wardsPath.value,
    })

    return {
      primePath: primePath.value,
      secPath: secPath.value,
      wardsPath: wardsPath.value,
    }
  }

  async function uploadAplImg(uuid: any, file: any) {
    uploading.value = true
    console.log(file)
    if (!has_files.value) return
    const fileExt = file.name.split('.').pop()
    const fileName = `${file.apl_type}`
    const filePath = `${fileName}.${fileExt}`
    const path: any = `${uuid}/${filePath}`

    try {
      const { data, error } = await $SB.storage
        .from('applicants')
        .upload(path, file)
      if (error) throw error
      uploading.value = false
      console.log(data)

      console.log('uploaded img')
      return path
    } catch (err: any) {
      return useErrorHandle(err, uploading.value)
    }
  }

  async function updateSingleAplImg(path: any) {
    uploading.value = true
    try {
      const { data, error } = await $SB.storage
        .from('applicants')
        .update(path, files.value[0], {
          cacheControl: '1',
          upsert: true,
        })

      if (error) throw error
      uploading.value = false
      return path
    } catch (error: any) {
      return useErrorHandle(error, uploading.value)
    }
  }

  const updateAplImg = async (path: any, uuid: any) => {
    uploading.value = true
    try {
      await deleteAplImg(path)
      await uploadAplImg(uuid, files.value[0])
      uploading.value = false
    } catch (err: any) {
      uploading.value = false
      console.trace(err.message)
    } finally {
      resetFiles()
    }
  }

  function resetFiles() {
    files.value = []
    primeIMG.value = undefined
    secIMG.value = undefined
  }

  const deleteAplImg = async (path: string) => {
    uploading.value = true
    try {
      const { data, error } = await $SB.storage
        .from('applicants')
        .remove([path])
      if (error) throw error
      uploading.value = false
      return data
    } catch (err: any) {
      return useErrorHandle(err, uploading.value)
    }
  }

  const updateAplPath = async (
    pathObj:
      | {
          primePath: string[] | null
          secPath: string[] | null
          wardsPath: string[] | null
        }
      | undefined,
    newPath: string,
    id: string | undefined | null,
    type: string
  ) => {
    uploading.value = true
    if (type == 'Primary') {
      pathObj!.primePath?.push(newPath)
    } else if (type == 'Secondary') {
      pathObj!.secPath?.push(newPath)
    } else {
      pathObj!.wardsPath?.push(newPath)
    }
    try {
      const { data, error } = await $SB
        .from('applicants')
        .update({ aplImg_path: pathObj! })
        .eq('apl_id', id)
      if (error) throw error
      uploading.value = false
      return data
    } catch (err: any) {
      return useErrorHandle(err, uploading.value)
    }
  }

  return {
    files,
    has_files,
    uploading,
    primePath,
    secPath,
    wardsPath,
    primeIMG,
    secIMG,
    updateAplPath,
    uploadAplImg,
    deleteAplImg,
    updateAplImg,
    updateSingleAplImg,
    uploadFiles,
    updateFile,
    setFiles,
    removeFile,
    resetFiles,
  }
})
