import React from 'react'
import _profileHeader from '../../components/profile/profileHeader'
import _profileTweets from '../../components/profile/profileTweets'
import SideBar from '../../components/sidebarSection'
import Widget from '../../components/Widget'

const style = {
  wrapper: `flex justify-center h-full w-full select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d]  overflow-auto	`,
}

const profile = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <SideBar />
        <div className={style.mainContent}>
          <_profileHeader />
          <_profileTweets />
        </div>
        <Widget />
      </div>
    </div>
  )
}

export default profile