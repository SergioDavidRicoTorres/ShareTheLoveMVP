import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FIRESTORE_DB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { MoodsAndTagsCatalogue, MoodsAndTagsCategory, Mood } from "./types";

const MoodsAndTagsContext = createContext<{
  moodsAndTags: MoodsAndTagsCatalogue | null;
  getMoodsAndTagsCategories: (postType: string) => MoodsAndTagsCategory[];
  getAllMusicMoodAndTags: () => Mood[];
  getAllFilmsTVShowsMoodAndTags: () => Mood[];
  getAllPodcastsEpisodesMoodAndTags: () => Mood[];
  getAllMoodsAndTagsArray: () => Mood[];
} | null>(null);

type MoodsAndTagsProviderProps = {
  children: ReactNode;
};

const fetchAllMoodsAndTags = async (): Promise<MoodsAndTagsCatalogue> => {
  try {
    const docRef = doc(FIRESTORE_DB, "MoodsAndTags", "MoodsAndTagsData");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as MoodsAndTagsCatalogue;
    } else {
      console.error("No such document!");
      return { Music: [], FilmsAndTVShows: [], PodcastsEpisodes: [] };
    }
  } catch (error) {
    console.error("Error fetching moodsAndTags: ", error);
    return { Music: [], FilmsAndTVShows: [], PodcastsEpisodes: [] };
  }
};

export const MoodsAndTagsProvider = ({
  children,
}: MoodsAndTagsProviderProps) => {
  const [moodsAndTags, setMoodsAndTags] =
    useState<MoodsAndTagsCatalogue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllMoodsAndTags();
      setMoodsAndTags(data);
    };

    fetchData();
  }, []);

  const getMoodsAndTagsCategories = (
    postType: string
  ): MoodsAndTagsCategory[] => {
    if (!moodsAndTags) return [];
    switch (postType) {
      case "Song":
        return moodsAndTags.Music;
      case "Film/TVShow":
        return moodsAndTags.FilmsAndTVShows;
      case "PodcastEpisode":
        return moodsAndTags.PodcastsEpisodes;
      default:
        return [];
    }
  };

  const getAllMusicMoodAndTags = (): Mood[] => {
    if (!moodsAndTags) return [];
    let allMusicMoods: Mood[] = [];
    const musicMoodsCategories = moodsAndTags.Music;
    for (const category of musicMoodsCategories) {
      allMusicMoods = allMusicMoods.concat(category.moodsTagsList);
    }
    return allMusicMoods;
  };

  const getAllFilmsTVShowsMoodAndTags = (): Mood[] => {
    if (!moodsAndTags) return [];
    let allFilmsTVShowsMoods: Mood[] = [];
    const filmsTVShowsMoodsCategories = moodsAndTags.FilmsAndTVShows;
    for (const category of filmsTVShowsMoodsCategories) {
      allFilmsTVShowsMoods = allFilmsTVShowsMoods.concat(
        category.moodsTagsList
      );
    }
    return allFilmsTVShowsMoods;
  };

  const getAllPodcastsEpisodesMoodAndTags = (): Mood[] => {
    if (!moodsAndTags) return [];
    let allPodcastsEpisodesMoods: Mood[] = [];
    const podcastsEpisodesMoodsCategories = moodsAndTags.PodcastsEpisodes;
    for (const category of podcastsEpisodesMoodsCategories) {
      allPodcastsEpisodesMoods = allPodcastsEpisodesMoods.concat(
        category.moodsTagsList
      );
    }
    return allPodcastsEpisodesMoods;
  };

  const getAllMoodsAndTagsArray = (): Mood[] => {
    if (!moodsAndTags) return [];

    let allMoods: Mood[] = [];
    allMoods = allMoods.concat(getAllMusicMoodAndTags());
    allMoods = allMoods.concat(getAllFilmsTVShowsMoodAndTags());
    allMoods = allMoods.concat(getAllPodcastsEpisodesMoodAndTags());
    return allMoods;
  };

  return (
    <MoodsAndTagsContext.Provider
      value={{
        moodsAndTags,
        getMoodsAndTagsCategories,
        getAllMusicMoodAndTags,
        getAllFilmsTVShowsMoodAndTags,
        getAllPodcastsEpisodesMoodAndTags,
        getAllMoodsAndTagsArray,
      }}
    >
      {children}
    </MoodsAndTagsContext.Provider>
  );
};

export const useMoodsAndTags = () => {
  const context = useContext(MoodsAndTagsContext);
  if (!context) {
    throw new Error(
      "useMoodsAndTags must be used within a MoodsAndTagsProvider"
    );
  }
  return context;
};
