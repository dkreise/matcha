import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LogoutButton from '../components/LogoutButton';
import { Button } from "../components/ui/Button"
import SuggestedProfileCard from '../components/SuggestedProfileCard';
import { getRecommendations } from '../services/matches';

const Home = () => {
    const { accessToken } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [profiles, setProfiles] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [endReached, setEndReached] = useState(false)

    const fetchProfiles = async (afterId = null) => {
        setIsLoading(true)
        try {
            const profiles = await getRecommendations(axiosPrivate, 1, afterId)
            if (profiles.length === 0) {
                setEndReached(true)
            } else {
                setProfiles((prev) => [...prev, ...profiles])
            }
        } catch (err) {
            console.error('Error fetching profiles:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProfiles()
    }, [])

    // const handleAction = async (actionType) => {
    //     if (!profiles[currentIndex]) return

    //     const targetId = profiles[currentIndex].user_id
    //     try {
    //         await axios.post(`/api/matches/${actionType}`, {
    //             target_profile_id: targetId,
    //         })
    //     } catch (err) {
    //         console.error(`Failed to ${actionType}`, err)
    //     }

    //     const nextIndex = currentIndex + 1
    //     setCurrentIndex(nextIndex)

    //     // Fetch more if needed
    //     if (nextIndex >= profiles.length && !endReached) {
    //         const lastProfile = profiles[profiles.length - 1]
    //         await fetchProfiles(lastProfile.id)
    //     }
    // }

    const currentProfile = profiles[currentIndex]

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <h1 className="text-2xl">Suggested profiles for you:</h1>
            {isLoading && profiles.length === 0 && <p>Loading profiles...</p>}
            {!currentProfile && !isLoading && <p>No more matches right now 😢</p>}
            {currentProfile && <SuggestedProfileCard profile={currentProfile}/>}
            <br></br>
            <LogoutButton />
        </div>
    );
};
  
export default Home;