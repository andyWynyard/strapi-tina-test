import React from 'react'
import { useCMS } from 'tinacms'

const EditButton = () => {
  const cms = useCMS()
  return (
    <button
      className="tina-cms-button"
      onClick={() => (cms.enabled ? cms.disable() : cms.enable())}
    >
      {cms.enabled ? 'Stop edit' : 'edit the blog'}
    </button>
  )
}

export default EditButton
