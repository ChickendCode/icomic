import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Editor = ({ setContent, defaultContent }) => {
  return (
    <CKEditor
      className='about'
      editor={ClassicEditor}
      data={defaultContent || ''}
      onReady={editor => {
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data)
      }}
      onBlur={(event, editor) => {
      }}
      onFocus={(event, editor) => {
      }}
    />
  )
}

export default Editor