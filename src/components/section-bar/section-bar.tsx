import React, { useEffect } from 'react'
import ActionUtil from '@/nice-router/action-util'
import NavigationService from '@/nice-router/navigation-service'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { useVisible } from '@/service/use-service'
import { getExtMode, isEmpty } from '@/nice-router/nice-router-util'
import EleButton, { EleButtonProps } from '@/components/elements/ele-button'
import ActionIcon from '@/components/action-icon/action-icon'
import './styles.scss'

type SectionBarProps = {
  children?: any,
  className?: string,
  foldable?: boolean,
  expand?: boolean,
  mode?: 'bordered' | 'highlight'
} & EleButtonProps

/**
 * 可折叠，支持onClick和linkToUrl
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SectionBar(props: SectionBarProps) {
  const { visible, toggle, show, close } = useVisible(true)

  const {
    title,
    brief,
    className,
    imageUrl,
    icon,
    mode = [],
    disabled = false,
    foldable,
    expand = 'true',
    onClick,
    children,
    ...others
  } = props

  useEffect(() => {
    if (foldable) {
      if (expand) {
        show()
      } else {
        close()
      }
    }
  }, [foldable, expand])

  const isAction = ActionUtil.isActionLike(props)

  const handleClick = () => {
    if (disabled) {
      return
    }
    if (onClick) {
      onClick()
      return
    }
    if (foldable) {
      toggle()
      return
    }
    NavigationService.view(props)
  }

  const rootClass = getExtMode(mode, { foldable, disabled }).classNames('section-bar', className)

  const contentClass = classNames('section-bar-body', { hidden: !isAction && !visible })

  let theIcon = isEmpty(icon) && isAction ? 'right' : icon

  if (foldable) {
    theIcon = visible ? 'up' : 'down'
  }

  return (
    <View className={rootClass}>
      <EleButton mode='ghost' className='section-bar-header' onClick={handleClick} {...others}>
        <View className='section-bar-prefix' />
        <View className='section-bar-title'>{title}</View>
        <View className='section-bar-brief'>{brief}</View>
        <View className='section-bar-postfix'>
          <ActionIcon imageUrl={imageUrl} icon={theIcon} mode='widthFix' />
        </View>
      </EleButton>
      {children && <View className={contentClass}>{children}</View>}
    </View>
  )
}

export default SectionBar
