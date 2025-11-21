"use client";

import React, { useState } from "react";

interface SocialMediaContent {
  thumbnail_text?: string;
  hooks?: string;
  instagram_reel_caption?: string;
  facebook_reel_caption?: string;
  youtube_shorts?: {
    title: string;
    description: string;
    hashtags: string[];
  };
  linkedin_caption?: string;
  whatsapp_channel_post?: string;
  cta_pack?: string;
}

interface SocialMediaContentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  socialMediaContent: SocialMediaContent | null | undefined;
}

export default function SocialMediaContentViewer({
  isOpen,
  onClose,
  socialMediaContent,
}: SocialMediaContentViewerProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const ContentField = ({
    label,
    value,
    fieldKey,
  }: {
    label: string;
    value: string | undefined;
    fieldKey: string;
  }) => {
    if (!value) return null;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {label}
          </label>
          <button
            onClick={() => copyToClipboard(value, fieldKey)}
            className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
              copiedField === fieldKey
                ? "bg-green-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {copiedField === fieldKey ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <p className="text-gray-800 whitespace-pre-wrap break-words">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Social Media Content</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!socialMediaContent ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No social media content available
              </p>
            </div>
          ) : (
            <>
              {/* Instagram Reel Caption */}
              <ContentField
                label="Instagram Reel Caption"
                value={socialMediaContent.instagram_reel_caption}
                fieldKey="instagram_reel_caption"
              />

              {/* Facebook Reel Caption */}
              <ContentField
                label="Facebook Reel Caption"
                value={socialMediaContent.facebook_reel_caption}
                fieldKey="facebook_reel_caption"
              />

              {/* YouTube Shorts */}
              {socialMediaContent.youtube_shorts && (
                <div className="mb-6">
                  <div className="border-l-4 border-indigo-600 pl-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      YouTube Shorts
                    </h3>

                    {/* YouTube Title */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Title
                        </label>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              socialMediaContent.youtube_shorts!.title,
                              "yt_title"
                            )
                          }
                          className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                            copiedField === "yt_title"
                              ? "bg-green-600 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        >
                          {copiedField === "yt_title" ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                        <p className="text-gray-800">
                          {socialMediaContent.youtube_shorts.title}
                        </p>
                      </div>
                    </div>

                    {/* YouTube Description */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Description
                        </label>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              socialMediaContent.youtube_shorts!.description,
                              "yt_description"
                            )
                          }
                          className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                            copiedField === "yt_description"
                              ? "bg-green-600 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        >
                          {copiedField === "yt_description"
                            ? "✓ Copied"
                            : "Copy"}
                        </button>
                      </div>
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                        <p className="text-gray-800 whitespace-pre-wrap break-words">
                          {socialMediaContent.youtube_shorts.description}
                        </p>
                      </div>
                    </div>

                    {/* YouTube Hashtags */}
                    {socialMediaContent.youtube_shorts.hashtags &&
                      socialMediaContent.youtube_shorts.hashtags.length > 0 && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                              Hashtags
                            </label>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  socialMediaContent.youtube_shorts!.hashtags.join(
                                    " "
                                  ),
                                  "yt_hashtags"
                                )
                              }
                              className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                                copiedField === "yt_hashtags"
                                  ? "bg-green-600 text-white"
                                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
                              }`}
                            >
                              {copiedField === "yt_hashtags"
                                ? "✓ Copied"
                                : "Copy"}
                            </button>
                          </div>
                          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <p className="text-gray-800">
                              {socialMediaContent.youtube_shorts.hashtags.join(
                                " "
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* LinkedIn Caption */}
              <ContentField
                label="LinkedIn Caption"
                value={socialMediaContent.linkedin_caption}
                fieldKey="linkedin_caption"
              />

              {/* WhatsApp Channel Post */}
              <ContentField
                label="WhatsApp Channel Post"
                value={socialMediaContent.whatsapp_channel_post}
                fieldKey="whatsapp_channel_post"
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-100 p-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
