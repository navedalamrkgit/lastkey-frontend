import {
  BadgeCheck,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  useState,
} from "react";

import {
  getInitials,
} from "../../utils/getInitials";

function resolveProfileImageUrl(
  imageUrl,
) {
  if (!imageUrl) {
    return null;
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  const backendBaseUrl =
    (
      import.meta.env
        .VITE_BACKEND_BASE_URL ||
      "http://localhost:8080"
    ).replace(/\/+$/, "");

  const normalizedPath =
    imageUrl.startsWith("/")
      ? imageUrl
      : `/${imageUrl}`;

  return `${backendBaseUrl}${normalizedPath}`;
}

export default function ProfileSummaryCard({
  profile,
}) {
  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  const initials =
    getInitials(
      profile?.firstName,
      profile?.lastName,
    ) || "U";

  const profileImageUrl =
    resolveProfileImageUrl(
      profile?.profileImageUrl,
    );

  const showProfileImage =
    Boolean(profileImageUrl) &&
    !imageFailed;

  const fullName = [
    profile?.firstName,
    profile?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
      {showProfileImage ? (
        <img
          key={profileImageUrl}
          src={profileImageUrl}
          alt={
            fullName ||
            "Profile"
          }
          onError={() =>
            setImageFailed(true)
          }
          className="h-24 w-24 rounded-3xl border-4 border-white/10 object-cover shadow-lg"
        />
      ) : (
        <span className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white/10 bg-blue-600 text-2xl font-black text-white shadow-lg">
          {initials}
        </span>
      )}

      <h2 className="mt-6 text-2xl font-black">
        {fullName ||
          "LastKey User"}
      </h2>

      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {profile?.role
          ?.replace(
            /^ROLE_/,
            "",
          )
          ?.replaceAll(
            "_",
            " ",
          ) || "USER"}
      </p>

      <div className="mt-7 space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Mail className="h-4 w-4 shrink-0 text-blue-400" />

          <span className="break-all">
            {profile?.email ||
              "No email address"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Phone className="h-4 w-4 shrink-0 text-emerald-400" />

          <span>
            {profile?.phone ||
              "No phone number"}
          </span>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-start gap-3">
          {profile?.emailVerified ? (
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          )}

          <div>
            <p className="text-sm font-bold">
              {profile?.emailVerified
                ? "Email verified"
                : "Email verification pending"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {profile?.emailVerified
                ? "Recovery and security notifications are protected."
                : "Verify your email to secure account recovery."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}