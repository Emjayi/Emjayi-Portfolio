"use client"

import { useState } from "react"
import Image from "next/image"
import { Inter, VT323, Press_Start_2P } from "next/font/google"
import { motion } from "framer-motion"

// Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })
const pixelFont = VT323({ subsets: ["latin"], weight: ["400"] })
const retroFont = Press_Start_2P({ subsets: ["latin"], weight: ["400"] })

// Types
interface Character {
    id: number
    name: string
    anime: string
    image: string
    backgroundImage?: string
    powerLevel: number
    stats: {
        strength: number
        speed: number
        intelligence: number
        magic: number
        endurance: number
    }
    description: string
    abilities?: string[]
    quote: string
}

// Initial character data
const initialCharacterData: Character[] = [
    {
        id: 1,
        name: "Naruto Uzumaki",
        anime: "Naruto",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 5,
        stats: {
            strength: 85,
            speed: 80,
            intelligence: 65,
            magic: 90,
            endurance: 95,
        },
        description:
            "Naruto Uzumaki is a shinobi of Konohagakure's Uzumaki clan and the jinchūriki of the Nine-Tailed Demon Fox, Kurama. Despite being shunned by the village in his youth, Naruto worked hard to gain their acknowledgment and eventually became the Seventh Hokage.",
        abilities: ["Rasengan", "Shadow Clone Technique", "Sage Mode", "Nine-Tails Chakra Mode"],
        quote: "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!",
    },
    {
        id: 2,
        name: "Mikasa Ackerman",
        anime: "Attack on Titan",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 4,
        stats: {
            strength: 90,
            speed: 95,
            intelligence: 80,
            magic: 0,
            endurance: 85,
        },
        description:
            "Mikasa Ackerman is one of the main protagonists of Attack on Titan. She is the adoptive sister of Eren Yeager and one of the top graduates of the 104th Training Corps. Mikasa is known for her exceptional combat skills and unwavering loyalty to Eren.",
        abilities: ["3D Maneuver Gear Mastery", "Ackerman Power", "Expert Swordsmanship", "Enhanced Strength"],
        quote: "This world is cruel, but it's also very beautiful.",
    },
    {
        id: 3,
        name: "Goku",
        anime: "Dragon Ball",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 5,
        stats: {
            strength: 100,
            speed: 95,
            intelligence: 60,
            magic: 85,
            endurance: 100,
        },
        description:
            "Son Goku is the main protagonist of the Dragon Ball series. A Saiyan raised on Earth, Goku constantly strives to become the strongest warrior possible and to protect his loved ones and the Earth from threats.",
        abilities: ["Kamehameha", "Super Saiyan Transformations", "Instant Transmission", "Spirit Bomb"],
        quote: "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
    },
    {
        id: 4,
        name: "Levi Ackerman",
        anime: "Attack on Titan",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 5,
        stats: {
            strength: 95,
            speed: 100,
            intelligence: 90,
            magic: 0,
            endurance: 85,
        },
        description:
            "Captain Levi Ackerman is known as humanity's strongest soldier. Despite his small stature, his battle prowess is unmatched, and he serves as the leader of the Special Operations Squad within the Survey Corps.",
        abilities: ["3D Maneuver Gear Mastery", "Ackerman Power", "Expert Swordsmanship", "Tactical Genius"],
        quote: "The only thing we're allowed to do is to believe that we won't regret the choice we made.",
    },
    {
        id: 5,
        name: "Asuka Langley Soryu",
        anime: "Neon Genesis Evangelion",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 3,
        stats: {
            strength: 70,
            speed: 75,
            intelligence: 90,
            magic: 0,
            endurance: 65,
        },
        description:
            "Asuka Langley Soryu is the Second Child and pilot of Evangelion Unit-02. She is a child prodigy who graduated college at a young age and takes great pride in her piloting skills.",
        abilities: ["Eva Piloting", "Combat Training", "Multilingual", "High Intelligence"],
        quote: "What are you, stupid?!",
    },
    {
        id: 6,
        name: "Spike Spiegel",
        anime: "Cowboy Bebop",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 3,
        stats: {
            strength: 80,
            speed: 85,
            intelligence: 85,
            magic: 0,
            endurance: 75,
        },
        description:
            "Spike Spiegel is a former member of the Red Dragon Crime Syndicate who became a bounty hunter and the partner of Jet Black aboard the Bebop. He is known for his laid-back attitude and exceptional martial arts skills.",
        abilities: ["Jeet Kune Do", "Marksmanship", "Piloting", "Improvisation"],
        quote: "Whatever happens, happens.",
    },
    {
        id: 7,
        name: "Sailor Moon",
        anime: "Sailor Moon",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 4,
        stats: {
            strength: 60,
            speed: 70,
            intelligence: 65,
            magic: 95,
            endurance: 75,
        },
        description:
            "Usagi Tsukino, better known as Sailor Moon, is the main protagonist of the series. Initially a clumsy crybaby, she grows into her role as the leader of the Sailor Guardians who protect Earth from various villains.",
        abilities: ["Moon Tiara Action", "Moon Healing Escalation", "Silver Crystal Power", "Transformation"],
        quote: "In the name of the Moon, I'll punish you!",
    },
    {
        id: 8,
        name: "Edward Elric",
        anime: "Fullmetal Alchemist",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 4,
        stats: {
            strength: 75,
            speed: 80,
            intelligence: 95,
            magic: 90,
            endurance: 85,
        },
        description:
            "Edward Elric, also known as the Fullmetal Alchemist, is a prodigy who became the youngest State Alchemist in history. After a failed human transmutation cost him his arm and leg, he embarks on a journey to restore his brother's body.",
        abilities: ["Alchemy", "Martial Arts", "Tactical Thinking", "Automail Prosthetics"],
        quote: "A lesson without pain is meaningless. That's because no one can gain without sacrificing something.",
    },
]

// Names and anime series for random generation
const RANDOM_FIRST_NAMES = [
    "Hiro",
    "Akira",
    "Yuki",
    "Ren",
    "Kai",
    "Sora",
    "Haruki",
    "Takashi",
    "Mizuki",
    "Sakura",
    "Hikari",
    "Yuna",
    "Mei",
    "Aoi",
    "Kaori",
    "Rin",
]

const RANDOM_LAST_NAMES = [
    "Nakamura",
    "Yamamoto",
    "Tanaka",
    "Suzuki",
    "Sato",
    "Watanabe",
    "Takahashi",
    "Kobayashi",
    "Kato",
    "Yoshida",
    "Yamada",
    "Sasaki",
    "Yamaguchi",
    "Matsumoto",
]

const RANDOM_ANIME_SERIES = [
    "Cosmic Nexus",
    "Spirit Blade",
    "Neon Horizon",
    "Phantom Protocol",
    "Astral Legends",
    "Cyber Samurai",
    "Elemental Guardians",
    "Destiny Forge",
]

const RANDOM_ABILITIES = [
    "Energy Manipulation",
    "Telekinesis",
    "Time Manipulation",
    "Shadow Control",
    "Elemental Mastery",
    "Psychic Vision",
    "Healing Touch",
    "Dimensional Travel",
    "Mind Reading",
    "Gravity Control",
    "Lightning Speed",
    "Shapeshifting",
    "Force Field Generation",
    "Illusion Casting",
    "Dragon Summoning",
]

const RANDOM_QUOTES = [
    "The only limit to your power is the one you set for yourself.",
    "Even in darkness, I am the light that never fades.",
    "My destiny is not written in the stars, but carved by my own hands.",
    "The strongest warriors aren't those who never fall, but those who rise again.",
    "When the world turns its back on you, show it what it means to be a true hero.",
    "My power isn't a gift—it's a responsibility I carry for those I protect.",
    "The path of a warrior is paved with both victory and defeat.",
    "I don't fight because I hate what's in front of me, but because I love what's behind me.",
]

// Main App Component
export default function RetroAnimeCards() {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [characters, setCharacters] = useState<Character[]>(initialCharacterData)
    const [selectedAnime, setSelectedAnime] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("create")

    // New character state
    const [newCharacter, setNewCharacter] = useState<Partial<Character>>({
        name: "",
        anime: "",
        image: "/placeholder.svg?height=400&width=300",
        backgroundImage: "/placeholder.svg?height=600&width=400",
        powerLevel: 3,
        stats: {
            strength: 50,
            speed: 50,
            intelligence: 50,
            magic: 50,
            endurance: 50,
        },
        description: "",
        abilities: [""],
        quote: "",
    })

    // Filter characters by selected anime
    const animeList = Array.from(new Set(characters.map((char) => char.anime)))
    const filteredCharacters = selectedAnime ? characters.filter((char) => char.anime === selectedAnime) : characters

    // Handle form input changes
    const handleChange = (field: string, value: any) => {
        setNewCharacter((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleStatChange = (stat: string, value: number) => {
        setNewCharacter((prev) => ({
            ...prev,
            stats: {
                ...prev.stats,
                strength: prev.stats?.strength ?? 50,
                speed: prev.stats?.speed ?? 50,
                intelligence: prev.stats?.intelligence ?? 50,
                magic: prev.stats?.magic ?? 50,
                endurance: prev.stats?.endurance ?? 50,
                [stat]: value,
            },
        }))
    }

    const handleAbilityChange = (index: number, value: string) => {
        const newAbilities = [...(newCharacter.abilities || [""])]
        newAbilities[index] = value
        setNewCharacter((prev) => ({
            ...prev,
            abilities: newAbilities,
        }))
    }

    const addAbility = () => {
        setNewCharacter((prev) => ({
            ...prev,
            abilities: [...(prev.abilities || []), ""],
        }))
    }

    const removeAbility = (index: number) => {
        const newAbilities = [...(newCharacter.abilities || [""])]
        newAbilities.splice(index, 1)
        setNewCharacter((prev) => ({
            ...prev,
            abilities: newAbilities.length ? newAbilities : [""],
        }))
    }

    // Generate random character
    const generateRandomCharacter = () => {
        const firstName = RANDOM_FIRST_NAMES[Math.floor(Math.random() * RANDOM_FIRST_NAMES.length)]
        const lastName = RANDOM_LAST_NAMES[Math.floor(Math.random() * RANDOM_LAST_NAMES.length)]
        const anime = RANDOM_ANIME_SERIES[Math.floor(Math.random() * RANDOM_ANIME_SERIES.length)]

        // Generate 2-4 random abilities
        const numAbilities = Math.floor(Math.random() * 3) + 2
        const abilities: string[] = []
        for (let i = 0; i < numAbilities; i++) {
            let ability
            do {
                ability = RANDOM_ABILITIES[Math.floor(Math.random() * RANDOM_ABILITIES.length)]
            } while (abilities.includes(ability))
            abilities.push(ability)
        }

        const quote = RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)]

        setNewCharacter({
            name: `${firstName} ${lastName}`,
            anime,
            image: "/placeholder.svg?height=400&width=300",
            backgroundImage: "/placeholder.svg?height=600&width=400",
            powerLevel: Math.floor(Math.random() * 5) + 1,
            stats: {
                strength: Math.floor(Math.random() * 70) + 30,
                speed: Math.floor(Math.random() * 70) + 30,
                intelligence: Math.floor(Math.random() * 70) + 30,
                magic: Math.floor(Math.random() * 70) + 30,
                endurance: Math.floor(Math.random() * 70) + 30,
            },
            description: `${firstName} ${lastName} is a powerful character from ${anime} with exceptional abilities and a mysterious past. Known for ${Math.random() > 0.5 ? "their strategic mind" : "their combat prowess"}, they have become a legend in their world.`,
            abilities,
            quote,
        })
    }

    // Add new character
    const addCharacter = () => {
        if (newCharacter.name && newCharacter.anime && newCharacter.description && newCharacter.quote) {
            const maxId = Math.max(0, ...characters.map((char) => char.id))
            const characterToAdd = {
                ...newCharacter,
                id: maxId + 1,
            } as Character

            setCharacters((prev) => [...prev, characterToAdd])
            setIsModalOpen(false)

            // Reset form
            setNewCharacter({
                name: "",
                anime: "",
                image: "/placeholder.svg?height=400&width=300",
                backgroundImage: "/placeholder.svg?height=600&width=400",
                powerLevel: 3,
                stats: {
                    strength: 50,
                    speed: 50,
                    intelligence: 50,
                    magic: 50,
                    endurance: 50,
                },
                description: "",
                abilities: [""],
                quote: "",
            })
        }
    }

    // Character Card Component
    const CharacterCard = ({ character }: { character: Character }) => {
        const [isFlipped, setIsFlipped] = useState(false)

        const statColors: Record<string, string> = {
            strength: "bg-red-500",
            speed: "bg-blue-500",
            intelligence: "bg-purple-500",
            magic: "bg-pink-500",
            endurance: "bg-green-500",
        }

        return (
            <div
                className="relative h-[450px] w-full cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="relative w-full h-full preserve-3d transition-all duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* Front of card */}
                    <div
                        className={`absolute w-full h-full backface-hidden overflow-hidden 
                      ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} 
                      border-4 border-double ${isDarkMode ? "border-pink-500" : "border-purple-700"}
                      retro-shadow`}
                    >
                        {/* Scanlines overlay */}
                        <div className="absolute inset-0 pointer-events-none scanlines opacity-10"></div>

                        <div className="relative h-[250px] overflow-hidden">
                            <Image
                                src={character.image || "/placeholder.svg"}
                                alt={character.name}
                                width={400}
                                height={250}
                                className="object-cover w-full h-full"
                            />
                            <div
                                className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-gray-900" : "from-gray-800"
                                    } to-transparent opacity-70`}
                            ></div>
                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <h3
                                    className={`text-xl font-bold ${isDarkMode ? "text-pink-300" : "text-purple-700"} retro-text-shadow`}
                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                >
                                    {character.name}
                                </h3>
                                <p
                                    className={`text-sm ${isDarkMode ? "text-blue-300" : "text-blue-600"} font-medium`}
                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                >
                                    {character.anime}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span
                                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-sm`}
                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                >
                                    Power Level
                                </span>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-4 h-4 mx-0.5 ${i < character.powerLevel
                                                ? isDarkMode
                                                    ? "bg-yellow-400"
                                                    : "bg-yellow-500"
                                                : isDarkMode
                                                    ? "bg-gray-700"
                                                    : "bg-gray-300"
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {Object.entries(character.stats).map(([stat, value]) => (
                                <div key={stat} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span
                                            className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} capitalize`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            {stat}
                                        </span>
                                        <span
                                            className={`${isDarkMode ? "text-white" : "text-black"} font-medium`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            {value}/100
                                        </span>
                                    </div>
                                    <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800" : "bg-gray-300"} border border-gray-600`}>
                                        <div className={`h-full ${statColors[stat]}`} style={{ width: `${value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`absolute bottom-3 right-3 flex items-center text-xs ${isDarkMode ? "text-yellow-300" : "text-yellow-600"
                                } blink`}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            <span>PRESS TO FLIP</span>
                        </div>
                    </div>

                    {/* Back of card */}
                    <div
                        className={`absolute w-full h-full backface-hidden overflow-hidden rotateY-180
                      ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} 
                      border-4 border-double ${isDarkMode ? "border-pink-500" : "border-purple-700"}
                      retro-shadow`}
                    >
                        {/* Scanlines overlay */}
                        <div className="absolute inset-0 pointer-events-none scanlines opacity-10"></div>

                        <div className="relative h-full p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className={`w-16 h-16 overflow-hidden border-2 ${isDarkMode ? "border-pink-500" : "border-purple-700"
                                        }`}
                                >
                                    <Image
                                        src={character.image || "/placeholder.svg"}
                                        alt={character.name}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h3
                                        className={`text-xl font-bold ${isDarkMode ? "text-pink-300" : "text-purple-700"
                                            } retro-text-shadow`}
                                        style={{ fontFamily: pixelFont.style.fontFamily }}
                                    >
                                        {character.name}
                                    </h3>
                                    <p
                                        className={`text-sm ${isDarkMode ? "text-blue-300" : "text-blue-600"} font-medium`}
                                        style={{ fontFamily: pixelFont.style.fontFamily }}
                                    >
                                        {character.anime}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`flex-1 overflow-y-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                    } space-y-4 pr-2 custom-scrollbar`}
                            >
                                <p className="text-sm leading-relaxed" style={{ fontFamily: pixelFont.style.fontFamily }}>
                                    {character.description}
                                </p>

                                {character.abilities && (
                                    <div>
                                        <h4
                                            className={`${isDarkMode ? "text-yellow-300" : "text-yellow-600"} font-medium mb-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Special Abilities
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {character.abilities.map((ability, index) => (
                                                <li key={index} className="text-sm" style={{ fontFamily: pixelFont.style.fontFamily }}>
                                                    {ability}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className={`mt-4 pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
                                <p
                                    className={`text-xs ${isDarkMode ? "text-green-300" : "text-green-600"} italic`}
                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                >
                                    {character.quote}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`absolute bottom-3 right-3 flex items-center text-xs ${isDarkMode ? "text-yellow-300" : "text-yellow-600"
                                } blink`}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            <span>PRESS TO FLIP BACK</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Character Generator Modal
    const CharacterGeneratorModal = () => {
        const isValid = newCharacter.name && newCharacter.anime && newCharacter.description && newCharacter.quote

        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? "visible" : "invisible"}`}>
                <div className="absolute inset-0 bg-black/70" onClick={() => setIsModalOpen(false)}></div>

                <div
                    className={`relative max-w-4xl max-h-[90vh] overflow-hidden flex flex-col 
                    ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} 
                    border-4 border-double ${isDarkMode ? "border-pink-500" : "border-purple-700"}
                    retro-shadow w-11/12 md:w-3/4`}
                >
                    {/* Scanlines overlay */}
                    <div className="absolute inset-0 pointer-events-none scanlines opacity-10"></div>

                    <div className="p-4 border-b-4 border-double border-pink-500">
                        <h2
                            className={`text-2xl font-bold text-center ${isDarkMode ? "text-pink-300" : "text-purple-700"
                                } retro-text-shadow`}
                            style={{ fontFamily: retroFont.style.fontFamily }}
                        >
                            CREATE NEW CHARACTER
                        </h2>
                    </div>

                    <div className="flex border-b-4 border-double border-pink-500">
                        <button
                            className={`flex-1 py-2 px-4 ${activeTab === "create"
                                ? isDarkMode
                                    ? "bg-pink-900 text-pink-300"
                                    : "bg-purple-200 text-purple-700"
                                : isDarkMode
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                            onClick={() => setActiveTab("create")}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            CREATE CHARACTER
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 ${activeTab === "preview"
                                ? isDarkMode
                                    ? "bg-pink-900 text-pink-300"
                                    : "bg-purple-200 text-purple-700"
                                : isDarkMode
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                            onClick={() => setActiveTab("preview")}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            PREVIEW CARD
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto">
                        {activeTab === "create" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <h3
                                            className={`text-lg font-medium mb-2 ${isDarkMode ? "text-pink-300" : "text-purple-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            CHARACTER DETAILS
                                        </h3>
                                        <button
                                            onClick={generateRandomCharacter}
                                            className={`text-xs flex items-center gap-1 px-2 py-1 
                                ${isDarkMode
                                                    ? "bg-blue-900 text-blue-300 border-blue-500"
                                                    : "bg-blue-200 text-blue-700 border-blue-500"
                                                } 
                                border-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            RANDOM
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            value={newCharacter.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            placeholder="Character name"
                                            className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                                } border-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Anime Series
                                        </label>
                                        <input
                                            value={newCharacter.anime}
                                            onChange={(e) => handleChange("anime", e.target.value)}
                                            placeholder="Anime series"
                                            className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                                } border-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Power Level (1-5)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <button
                                                    key={level}
                                                    onClick={() => handleChange("powerLevel", level)}
                                                    className={`w-8 h-8 flex items-center justify-center ${(newCharacter.powerLevel || 3) >= level
                                                        ? isDarkMode
                                                            ? "bg-yellow-400 text-black"
                                                            : "bg-yellow-500 text-black"
                                                        : isDarkMode
                                                            ? "bg-gray-700 text-gray-400"
                                                            : "bg-gray-300 text-gray-600"
                                                        } border-2 border-gray-600`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            value={newCharacter.description}
                                            onChange={(e) => handleChange("description", e.target.value)}
                                            placeholder="Character description"
                                            className={`w-full px-3 py-2 min-h-[100px] ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                                } border-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        >
                                            Quote
                                        </label>
                                        <textarea
                                            value={newCharacter.quote}
                                            onChange={(e) => handleChange("quote", e.target.value)}
                                            placeholder="Character's memorable quote"
                                            className={`w-full px-3 py-2 min-h-[60px] ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                                } border-2`}
                                            style={{ fontFamily: pixelFont.style.fontFamily }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3
                                        className={`text-lg font-medium mb-2 ${isDarkMode ? "text-pink-300" : "text-purple-700"}`}
                                        style={{ fontFamily: pixelFont.style.fontFamily }}
                                    >
                                        CHARACTER STATS
                                    </h3>

                                    {Object.entries(newCharacter.stats || {}).map(([stat, value]) => (
                                        <div key={stat} className="space-y-2">
                                            <div className="flex justify-between">
                                                <label
                                                    className={`text-sm font-medium capitalize ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                                >
                                                    {stat}
                                                </label>
                                                <span
                                                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                                >
                                                    {value}/100
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={value}
                                                onChange={(e) => handleStatChange(stat, Number.parseInt(e.target.value))}
                                                className="w-full h-4 appearance-none cursor-pointer"
                                                style={{
                                                    background: isDarkMode ? "#1f2937" : "#e5e7eb",
                                                    border: "2px solid #4b5563",
                                                }}
                                            />
                                        </div>
                                    ))}

                                    <div className="space-y-2 pt-4">
                                        <div className="flex justify-between items-center">
                                            <label
                                                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                                style={{ fontFamily: pixelFont.style.fontFamily }}
                                            >
                                                Special Abilities
                                            </label>
                                            <button
                                                onClick={addAbility}
                                                className={`text-xs px-2 py-1 
                                  ${isDarkMode
                                                        ? "bg-green-900 text-green-300 border-green-500"
                                                        : "bg-green-200 text-green-700 border-green-500"
                                                    } 
                                  border-2`}
                                                style={{ fontFamily: pixelFont.style.fontFamily }}
                                            >
                                                ADD ABILITY
                                            </button>
                                        </div>

                                        {newCharacter.abilities?.map((ability, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    value={ability}
                                                    onChange={(e) => handleAbilityChange(index, e.target.value)}
                                                    placeholder={`Ability ${index + 1}`}
                                                    className={`flex-1 px-3 py-2 ${isDarkMode
                                                        ? "bg-gray-800 text-white border-gray-600"
                                                        : "bg-white text-gray-900 border-gray-300"
                                                        } border-2`}
                                                    style={{ fontFamily: pixelFont.style.fontFamily }}
                                                />
                                                <button
                                                    onClick={() => removeAbility(index)}
                                                    disabled={newCharacter.abilities?.length === 1}
                                                    className={`px-2 ${isDarkMode
                                                        ? "bg-red-900 text-red-300 border-red-500"
                                                        : "bg-red-200 text-red-700 border-red-500"
                                                        } border-2 ${newCharacter.abilities?.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center p-6">
                                <div className="w-full max-w-sm">
                                    <CharacterCard character={newCharacter as Character} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t-4 border-double border-pink-500 flex justify-end gap-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={`px-4 py-2 ${isDarkMode ? "bg-gray-700 text-gray-300 border-gray-500" : "bg-gray-300 text-gray-700 border-gray-400"
                                } border-2`}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={addCharacter}
                            disabled={!isValid}
                            className={`px-4 py-2 ${isValid
                                ? isDarkMode
                                    ? "bg-pink-900 text-pink-300 border-pink-500"
                                    : "bg-purple-200 text-purple-700 border-purple-500"
                                : "bg-gray-700 text-gray-400 border-gray-600 opacity-50 cursor-not-allowed"
                                } border-2`}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            ADD CHARACTER
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Main render
    return (
        <div
            className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-200"} retro-grid transition-colors duration-300`}
        >
            {/* Theme toggle */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`fixed top-4 right-4 z-50 p-2 ${isDarkMode ? "bg-yellow-400 text-black" : "bg-indigo-900 text-white"
                    } border-2 border-gray-600`}
                aria-label="Toggle theme"
            >
                {isDarkMode ? "LIGHT" : "DARK"}
            </button>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1
                    className={`text-4xl md:text-6xl font-bold text-center mb-8 ${isDarkMode ? "text-pink-300" : "text-purple-700"
                        } retro-text-shadow`}
                    style={{ fontFamily: retroFont.style.fontFamily }}
                >
                    RETRO ANIME CARDS
                </h1>

                <div className="space-y-8">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <button
                            onClick={() => setSelectedAnime(null)}
                            className={`px-4 py-2 text-sm font-medium ${selectedAnime === null
                                ? isDarkMode
                                    ? "bg-pink-900 text-pink-300 border-pink-500"
                                    : "bg-purple-200 text-purple-700 border-purple-500"
                                : isDarkMode
                                    ? "bg-gray-800 text-gray-300 border-gray-600"
                                    : "bg-gray-300 text-gray-700 border-gray-400"
                                } border-2`}
                            style={{ fontFamily: pixelFont.style.fontFamily }}
                        >
                            ALL
                        </button>
                        {animeList.map((anime) => (
                            <button
                                key={anime}
                                onClick={() => setSelectedAnime(anime)}
                                className={`px-4 py-2 text-sm font-medium ${selectedAnime === anime
                                    ? isDarkMode
                                        ? "bg-pink-900 text-pink-300 border-pink-500"
                                        : "bg-purple-200 text-purple-700 border-purple-500"
                                    : isDarkMode
                                        ? "bg-gray-800 text-gray-300 border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400"
                                    } border-2`}
                                style={{ fontFamily: pixelFont.style.fontFamily }}
                            >
                                {anime}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCharacters.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                </div>

                {/* Add button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center ${isDarkMode ? "bg-pink-900 text-pink-300 border-pink-500" : "bg-purple-200 text-purple-700 border-purple-500"
                        } border-4 retro-shadow`}
                    style={{ fontFamily: retroFont.style.fontFamily }}
                >
                    +
                </button>

                {/* Character generator modal */}
                <CharacterGeneratorModal />
            </div>

            {/* Global styles */}
            <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .retro-shadow {
          box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.75);
        }
        .retro-text-shadow {
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.75);
        }
        .retro-grid {
          background-image: linear-gradient(rgba(255, 105, 180, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 105, 180, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
        }
        .blink {
          animation: blink-animation 1s steps(2, start) infinite;
        }
        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1f2937" : "#e5e7eb"};
          border: 1px solid ${isDarkMode ? "#4b5563" : "#9ca3af"};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "#ec4899" : "#7e22ce"};
          border: 1px solid ${isDarkMode ? "#be185d" : "#581c87"};
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: ${isDarkMode ? "#ec4899" : "#7e22ce"};
          border: 2px solid ${isDarkMode ? "#be185d" : "#581c87"};
          cursor: pointer;
        }
      `}</style>
        </div>
    )
}
