import React, { useContext } from 'react'
import Post from "../Post"
import { TwitterContext } from '../../context/TwitterContext'


const style = {
    wrapper: `no-scroolbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`
}

const _profileTweets = () => {
    const { currentUser, currentAccount } = useContext(TwitterContext)
    return (
        <div className={style.wrapper}>
            {currentUser.tweets?.map((tweet, index) => (
                <Post
                    key={index}
                    displayName={currentUser.name === 'Unnamed'
                        ? `${currentAccount.slice(
                            0,
                            4,
                        )}...${currentAccount.slice(41)}`
                        : currentUser.name}
                    userName={`${currentAccount.slice(
                        0,
                        4,
                    )}...${currentAccount.slice(41)}`}
                    avatar={currentUser.profileImage}
                    text={tweet.tweet}
                    timestamp={tweet.timestamp}
                />
            ))}
        </div>
    )
}

export default _profileTweets