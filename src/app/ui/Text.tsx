

import { translate } from '@/helper/helper'

function Text({text}) {
  return (
    <>
    {text}
    {translate(text)}
    </>
  )
}

export default Text