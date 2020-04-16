import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import ServerImage from '@/server-image/server-image'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'

import './styles.scss'

function EleMoreActions(props) {
  const { actionList, linkToUrl, mode, text, imageUrl, icon, className } = props

  const showSheet = () => {
    const itemList = actionList.map((it) => it.title)
    Taro.showActionSheet({
      itemList,
      success: ({ tapIndex }) => {
        NavigationService.view(actionList[tapIndex])
      },
    })
  }

  const onClick = () => {
    if (actionList.length === 0 && linkToUrl.length > 0) {
      NavigationService.view(linkToUrl)
      return
    }

    if (mode === 'actionSheet' || (mode === 'auto' && actionList.length > 1)) {
      showSheet(actionList)
      return
    }

    if (mode === 'link' || (mode === 'auto' && actionList.length === 1)) {
      NavigationService.view(actionList[0])
    }
  }

  const rootClass = classNames('ele-more-actions', className)

  return (
    <View onClick={onClick} className={rootClass}>
      <Text className='ele-more-actions-txt'>{text}</Text>
      {imageUrl.length > 0 && (
        <ServerImage
          className='ele-more-actions-image'
          customStyle={{ width: '20px', height: '20px' }}
          src={imageUrl}
        />
      )}
      {icon.length > 0 && <AtIcon className='ele-more-actions-icon' value={icon} size={20} color='grey' />}
    </View>
  )
}

EleMoreActions.options = {
  addGlobalClass: true,
}
EleMoreActions.defaultProps = {
  text: '',
  imageUrl: '',
  icon: 'chevron-right',
  actionList: [],
  mode: 'auto',
  linkToUrl: '',
}

export default EleMoreActions
