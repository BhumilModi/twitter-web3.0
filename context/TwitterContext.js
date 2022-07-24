import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {

    const [appStatus, setAppStatus] = useState('loading')
    const router = useRouter()
    const [currentAccount, setCurrentAccount] = useState('')
    const [tweets, setTweets] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        if (!currentAccount && appStatus == 'connected') return
        getCurrentUserDetails(currentAccount)
        fetchTweets()
    }, [currentAccount, appStatus])

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch (err) {
            router.push('/')
            setAppStatus('error')
        }
    }



    const connectToWallet = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            setAppStatus('loading')

            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch (err) {
            setAppStatus('error')
        }
    }

    const createUserAccount = async (userAddress = currentAccount) => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const userDoc = {
                _type: 'users',
                _id: userAddress,
                name: 'Unnamed',
                profileImage: "/profile.jpg",
                walletAddress: userAddress,
            }

            await client.createIfNotExists(userDoc)

            setAppStatus('connected')
        } catch (e) {
            router.push('/')
            setAppStatus('error')
        }
    }


    const fetchTweets = async () => {
        const query = `
          *[_type == "tweets"]{
            "author": author->{name, walletAddress, profileImage},
            tweet,
            timestamp
          }|order(timestamp desc)
        `
        const sanityResponse = await client.fetch(query)
        setTweets([])
        sanityResponse.forEach(async item => {
            const profileImageUrl = item.author.profileImage
            const newItem = {
                tweet: item.tweet,
                timestamp: item.timestamp,
                author: {
                    name: item.author.name,
                    walletAddress: item.author.walletAddress,
                    profileImage: profileImageUrl,
                },
            }

            setTweets(prevState => [...prevState, newItem])
        })
    }


    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== 'connected') return

        const query = `
          *[_type == "users" && _id == "${userAccount}"]{
            "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
            name,
            profileImage,
            isProfileImageNft,
            coverImage,
            walletAddress
          }
        `
        const response = await client.fetch(query)

        const profileImageUri = response[0].profileImage

        setCurrentUser({
            tweets: response[0].tweets,
            name: response[0].name,
            profileImage: profileImageUri,
            walletAddress: response[0].walletAddress,
            coverImage: response[0].coverImage,
        })
        console.log(currentUser)
    }


    return (
        <TwitterContext.Provider value={{
            appStatus,
            currentAccount,
            connectToWallet,
            tweets,
            fetchTweets,
            setAppStatus,
            currentUser,
            getCurrentUserDetails,
        }}>
            {children}
        </TwitterContext.Provider>
    )
}