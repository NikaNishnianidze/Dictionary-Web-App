import axios from "axios";
import searchIcon from "../../public/assets/icon-search.svg";
import { useRef, useState } from "react";
import { fontClasses } from "./Header";
import audioIcon from "../../public/assets/icon-play.svg";
import ovalIcon from "../../public/assets/Oval.svg";
import linkIcon from "../../public/assets/tabler_external-link.svg";

type TPhonetic = {
  text?: string;
  audio?: string;
};

type TDefinition = {
  definition: string;
  example: string;
};

type TMeaning = {
  partOfSpeech: string;
  definitions: TDefinition[];
  synonyms: string[];
};

export type TPost = {
  word: string;
  phonetic?: string;
  phonetics: TPhonetic[];
  meanings: TMeaning[];
  sourceUrls?: string[]; // 👈 Add this
  license?: {
    name: string;
    url: string;
  };
};

interface IFont {
  font: "sans" | "serif" | "mono";
}

const Main: React.FC<IFont> = ({ font }) => {
  const [data, setData] = useState<TPost[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | null>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const FetchInfo = async () => {
    if (!inputValue) {
      setError(true);

      return;
    } else {
      setError(false);
    }
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`
      );
      if (response.status == 200) {
        const uniqueWords = response.data.filter(
          (post: TPost, index: number, self: TPost[]) => {
            return self.findIndex((item) => item.word === post.word) === index;
          }
        );
        setData(uniqueWords);
        console.log(uniqueWords);
      }
    } catch (error) {
      console.log("Failed to Fetch Data");
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="px-[24px] flex flex-col">
      <div className="input-div flex items-center justify-center">
        <input
          type="text"
          className={`w-[327px] h-[48px] bg-input absolute mt-[15px] px-[24px] rounded-[16px] ${
            error ? "border-[1px] border-[#FF5252]" : ""
          } dark:bg-input-dark dark:text-[#fff]`}
          placeholder="Write a Word"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search icon"
          className="relative left-35 top-2"
          onClick={FetchInfo}
        />
      </div>
      {error && (
        <p className={`${fontClasses[font]} text-[#FF5252] mt-[23px]`}>
          Whoops, can't be empty…
        </p>
      )}

      <div className="info flex flex-col items-center">
        {data.map((post) => {
          return (
            <div className="main-info " key={post.word}>
              <div className="audio flex flex-row items-center justify-between mt-[23px]">
                <div className="words flex flex-col ">
                  <p
                    className={`text-[#2D2D2D] text-[32px] font-bold ${fontClasses[font]} dark:text-[#fff]`}
                  >
                    {post.word}
                  </p>
                  {post.phonetics[1]?.text && (
                    <p
                      className={`${fontClasses[font]} text-[18px] font-normal text-[#A445ED]`}
                    >
                      {post.phonetics[1].text}
                    </p>
                  )}
                </div>
                {post.phonetics[0]?.audio && (
                  <div onClick={handlePlayAudio}>
                    <img
                      src={audioIcon}
                      alt="play audio"
                      className="w-[48px] h-[48px]"
                    />
                    <audio src={post.phonetics[0].audio} ref={audioRef}></audio>
                  </div>
                )}
              </div>
              {post.meanings.map((meaning) => {
                if (meaning.partOfSpeech === "noun") {
                  return (
                    <div
                      key={meaning.partOfSpeech}
                      className="noun flex flex-col  mt-[39px]"
                    >
                      <div className="div flex flex-row items-center justify-between">
                        <p
                          className={`text-[18px] text-[#2D2D2D] font-bold italic ${fontClasses[font]} dark:text-[#fff]`}
                        >
                          {meaning.partOfSpeech}
                        </p>
                        <div className="rectangle w-[266px] h-[1px] bg-rectangle"></div>
                      </div>
                      <p
                        className={`mt-[31px] text-[#757575] text-[16px] font-normal ${fontClasses[font]}`}
                      >
                        Meaning
                      </p>
                      {meaning.definitions.map((def, index) => (
                        <div
                          key={index}
                          className="definition mt-[10px] max-w-[400px] flex flex-col"
                        >
                          <div className="div flex flex-row gap-[20px]">
                            <img src={ovalIcon} alt="oval icon" />
                            <p
                              className={`text-[15px] text-[#2D2D2D] ${fontClasses[font]} dark:text-[#fff]`}
                            >
                              {def.definition}
                            </p>
                            <p
                              className={`text-[15px] text-[#2D2D2D] italic ${fontClasses[font]} dark:text-[#fff]`}
                            >
                              {def.example}
                            </p>
                          </div>
                        </div>
                      ))}

                      {meaning.synonyms && meaning.synonyms.length > 0 && (
                        <div className="synonyms mt-[20px] flex items-center gap-[24px]">
                          <p
                            className={`text-[#757575] text-[16px] font-normal ${fontClasses[font]}`}
                          >
                            Synonyms
                          </p>
                          <ul>
                            {meaning.synonyms.map((synonym, index) => (
                              <li
                                key={index}
                                className={` ${fontClasses[font]} text-[#A445ED] text-[16px] font-bold`}
                              >
                                {synonym}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
              {post.meanings.map((meaning) => {
                if (meaning.partOfSpeech === "verb") {
                  return (
                    <div
                      key={meaning.partOfSpeech}
                      className="verb flex flex-col mt-[39px]"
                    >
                      <div className="div flex flex-row items-center justify-between">
                        <p
                          className={`${fontClasses[font]} text-[18px] text-[#2D2D2D] font-bold italic dark:text-[#fff]`}
                        >
                          {meaning.partOfSpeech}
                        </p>
                        <div className="rectangle w-[266px] h-[1px] bg-rectangle"></div>
                      </div>
                      <p
                        className={`${fontClasses[font]} mt-[31px] text-[#757575] text-[16px] font-normal`}
                      >
                        Meaning
                      </p>
                      {meaning.definitions.map((def, index) => (
                        <div
                          key={index}
                          className="definition mt-[10px] max-w-[400px] flex flex-col"
                        >
                          <div className="div flex flex-col gap-[20px]">
                            <div className="definition flex flex-row gap-[20px] mt-[17px]">
                              <img src={ovalIcon} alt="oval icon" />
                              <p
                                className={`${fontClasses[font]} text-[16px] text-[#2D2D2D] dark:text-[#fff]`}
                              >
                                {def.definition}
                              </p>
                            </div>

                            <p
                              className={`${fontClasses[font]} text-[16px] text-[#757575]  ml-[24px]`}
                            >
                              {`"${def.example}"`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
              <div className="rectangle mt-[32px] w-[327px] h-[1px] bg-rectangle"></div>
              {post.sourceUrls && post.sourceUrls.length > 0 && (
                <div className="source mt-[32px] flex flex-col gap-[8px]">
                  <p className="text-[#757575] text-[14px] font-normal underline">
                    Source
                  </p>
                  {post.sourceUrls.map((url, index) => (
                    <div className="flex items-center gap-[9px]">
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-[#2D2D2D] underline hover:text-[#A445ED] transition dark:text-[#fff]"
                      >
                        {url}
                      </a>
                      <img src={linkIcon} alt="link icon" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
