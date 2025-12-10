"use client";

import React, { useState, useEffect } from "react";
import { generatePageMetadata } from "@/lib/seo";
import Scene0 from "@/components/scenes/Scene0";
import Scene1 from "@/components/scenes/Scene1";
import Scene2 from "@/components/scenes/Scene2";
import Scene3 from "@/components/scenes/Scene3";
import { SCENE_TIMINGS } from "@/config/scenes.config";

export default function SocialMediaVideosPage() {
  const [currentSceneId, setCurrentSceneId] = useState(0);

  useEffect(() => {
    if (currentSceneId >= SCENE_TIMINGS.length) {
      return;
    }

    const currentSceneTiming = SCENE_TIMINGS[currentSceneId];
    const timer = setTimeout(() => {
      setCurrentSceneId(currentSceneId + 1);
    }, currentSceneTiming.duration * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer);
  }, [currentSceneId]);

  const renderScene = () => {
    switch (currentSceneId) {
      case 0:
        return (
          <Scene0
            text="QuizzyDock"
            fontSize="3.5rem"
            fontFamily="'Poppins', sans-serif"
          />
        );
      case 1:
        return (
          <Scene1
            imageSource="/scenes/scene1-1.png"
            text={`*Master* Coding \n#Faster#`}
          />
        );
      case 2:
        return (
          <Scene1
            imageSource="/scenes/screenshot 3.png"
            text={`Your #Daily# \nCoding *Boost*`}
          />
        );
      case 3:
        return (
          <Scene1
            imageSource="/scenes/overwhelming-item.png"
            text={`Too #many# \n#coding# *resources?*`}
          />
        );
      case 4:
        return (
          <Scene1
            imageSource="/scenes/screenshot 5.png"
            text={`Here's \nthe #simplest# \n#way# to *learn*.`}
          />
        );
      case 5:
        return (
          <Scene1 imageSource="/scenes/screenshot 8.png" text={`#MCQs#`} />
        );
      case 6:
        return (
          <Scene1
            imageSource="/scenes/screenshot 10.png"
            text={`#Output# \nQuestions`}
          />
        );
      case 7:
        return (
          <Scene1
            imageSource="/scenes/screenshot 11.png"
            text={`#Interview# \n*Preparation*\n Questions`}
          />
        );
      case 8:
        return (
          <Scene1
            imageSource="/scenes/screenshot 12.png"
            text={`Instant \n#Score#`}
          />
        );
      case 9:
        return (
          <Scene1
            imageSource="/scenes/Screenshot_1764140913.png"
            text={`*Instant*\n Test #Reviews#`}
          />
        );
      case 10:
        return (
          <Scene1
            imageSource="/scenes/Screenshot_1764140913.png"
            text={`Detailed \n#Explanations#`}
          />
        );
      case 11:
        return (
          <Scene2
            videoSource="/scenes/subjects-recording.mov"
            text={`#70,000+# \nCoding *Questions*\n Already #Live#`}
          />
        );
      case 12:
        return <Scene3 text={`#Join# \nOur *Learning* \n#Community#`} />;
      case 13:
        return (
          <Scene1
            imageSource="/scenes/screenshot 4.png"
            text={`#Download# \nthe *App* `}
          />
        );
      case 14:
        return (
          <Scene2
            videoSource="/scenes/hero-section.mov"
            text={`or\nStart #Free# on\n quizzydock.com`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/video-page-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Current Scene - key prop forces remount and animation reset */}
      <div key={currentSceneId}>{renderScene()}</div>
    </div>
  );
}
