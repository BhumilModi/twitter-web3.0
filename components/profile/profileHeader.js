import React, { useContext } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import Router from 'next/router'
import { TwitterContext } from '../../context/TwitterContext'


const style = {
    wrapper: `border-[#38444d] border-b`,
    header: `py-1 px-3 mt-2 flex items-center`,
    primary: `bg-transparent outline-none font-bold`,
    secondary: `text-[#8899a6] text-xs`,
    backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#323b44] p-1`,
    coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
    coverPhoto: `object-cover h-full w-full`,
    profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
    profileImage: `rounded-full h-[100px] w-[100px] pt-[2px] object-cover `,
    details: `px-3`,
    nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
    activeNav: `text-white`,
    cover: `bg-[white] h-full w-full flex justify-center items-center text-[black]`,
}

const _profileHeader = () => {
    const { currentAccount, currentUser } = useContext(TwitterContext)
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div
                    onClick={() => Router.push("/")}
                    className={style.backButton}
                >
                    <BsArrowLeft />
                </div>
                <div className={style.details}>
                    <div className={style.primary}>{currentUser.name}</div>
                    <div className={style.secondary}> {currentUser.tweets?.length} Tweets</div>
                </div>
            </div>
            <div className={style.coverPhotoContainer}>
                <img src='/cover.avif' alt='cover' className={style.coverPhoto} />
            </div>
            <div className={style.profileImageContainer}>
                <img src={currentUser.profileImage} alt='profilePic' className={style.profileImage} />
            </div>
            <div className={style.details}>
                <div className={style.primary}>{currentUser.name}</div>
                <div className={style.secondary}>
                    {currentAccount && (
                        <>
                            @{currentAccount.slice(0, 8)}...{currentAccount.slice(36)}
                        </>
                    )}
                </div>
            </div>
            <div className={style.nav}>
                <div className={style.activeNav}> Tweets </div>
                <div> Tweets $ Replies</div>
                <div> Media </div>
                <div> Links </div>
            </div>
        </div>
    )
}

export default _profileHeader