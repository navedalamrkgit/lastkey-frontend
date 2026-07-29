import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Image as ImageIcon,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { profileApi } from "../../api/profileApi";
import EmailVerificationModal from "../../components/profile/EmailVerificationModal";
import ProfileForm from "../../components/profile/ProfileForm";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { getErrorMessage } from "../../utils/errorHandler";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getProfileImageUrl(imageUrl) {
  if (!imageUrl) return null;

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:")
  ) {
    return imageUrl;
  }

  const backendBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ||
    "http://localhost:8080";

  return `${backendBaseUrl}${imageUrl}`;
}

function calculateProfileCompletion(profile) {
  const fields = [
    profile?.firstName,
    profile?.lastName,
    profile?.email,
    profile?.phone,
    profile?.dateOfBirth,
    profile?.occupation,
    profile?.address,
    profile?.city,
    profile?.state,
    profile?.country,
    profile?.postalCode,
    profile?.profileImageUrl,
  ];

  const completed = fields.filter(
    (value) => value !== null && value !== undefined && String(value).trim() !== "",
  ).length;

  return Math.round((completed / fields.length) * 100);
}

function CompletionMeter({ value }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-[24px] border px-4 py-3 sm:w-auto sm:min-w-[330px]" style={{ borderColor: "var(--border-primary)", background: "var(--surface-primary)", boxShadow: "var(--card-shadow)" }}>
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full p-[5px]"
        style={{
          background: `conic-gradient(#f97316 0deg, #ec4899 ${value * 1.25}deg, #8b5cf6 ${value * 2.55}deg, #22d3ee ${value * 3.6}deg, rgba(100,116,139,.22) ${value * 3.6}deg)`,
        }}
      >
        <div className="grid h-full w-full place-items-center rounded-full text-xs font-black" style={{ background: "var(--surface-inner)", color: "var(--text-primary)" }}>
          {value}%
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black" style={{ color: "var(--text-primary)" }}>Profile completion</p>
          <span className="text-xs font-bold text-orange-500">Keep it updated</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-inner)" }}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-orange-400"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ProfilePhotoCard({
  profile,
  previewUrl,
  selectedImage,
  imageError,
  imageUploading,
  fileInputRef,
  onSelectImage,
  onClearImage,
  onUploadImage,
}) {
  const imageUrl = getProfileImageUrl(previewUrl || profile?.profileImageUrl);
  const fullName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "LastKey user";

  return (
    <aside className="relative self-start overflow-hidden rounded-[30px] border border-fuchsia-400/20 bg-[linear-gradient(155deg,#1c1537_0%,#101827_48%,#191525_100%)] p-6 shadow-[0_24px_70px_rgba(2,8,23,.35)] sm:p-7">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-60 w-60 rounded-full bg-orange-500/14 blur-3xl" />
      <div className="pointer-events-none absolute left-6 top-6 grid grid-cols-5 gap-2 opacity-30">
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-fuchsia-300" />
        ))}
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div className="relative h-44 w-44 sm:h-48 sm:w-48">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet-500/35 via-fuchsia-500/25 to-orange-400/25 blur-2xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-[4px]">
            <div className="h-full w-full overflow-hidden rounded-full bg-[#09111f] p-1.5">
              <div className="h-full w-full overflow-hidden rounded-full bg-[#111a2d]">
                {imageUrl ? (
                  <img src={imageUrl} alt={fullName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-violet-300">
                    <UserRound className="h-20 w-20" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-0 flex h-13 w-13 items-center justify-center rounded-full border-4 border-[#101827] bg-gradient-to-br from-fuchsia-500 to-orange-500 text-white shadow-xl transition hover:scale-105"
            aria-label="Choose profile photo"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-black text-white">{fullName}</h2>
        <p className="mt-1 text-sm font-bold text-violet-200">
          {profile?.occupation || "Occupation not added"}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          {profile?.emailVerified ? "Email verified" : "Verification pending"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onSelectImage}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={imageUploading}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-fuchsia-400/35 bg-white/[0.04] px-5 text-sm font-black text-fuchsia-100 transition hover:border-orange-300/60 hover:bg-orange-500/10 hover:text-orange-100 disabled:opacity-60"
        >
          <ImageIcon className="h-4 w-4" />
          Change profile photo
        </button>

        <p className="mt-3 text-xs text-slate-400">JPG, PNG or WEBP · Maximum 5 MB</p>

        {selectedImage ? (
          <div className="mt-5 w-full rounded-[20px] border border-white/10 bg-black/20 p-4 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">{selectedImage.name}</p>
                <p className="mt-1 text-[11px] text-fuchsia-300">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={onClearImage}
                disabled={imageUploading}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-300 hover:bg-rose-500/15 hover:text-rose-300"
                aria-label="Remove selected photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onUploadImage}
              disabled={imageUploading}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Upload className={`h-4 w-4 ${imageUploading ? "animate-pulse" : ""}`} />
              {imageUploading ? "Updating photo..." : "Save new photo"}
            </button>
          </div>
        ) : null}

        {imageError ? (
          <p className="mt-4 flex items-center gap-2 text-left text-xs font-semibold text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {imageError}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

function SupportCard({ icon: Icon, title, description, tone = "violet" }) {
  const tones = {
    violet: "border-violet-400/20 bg-violet-500/10 text-violet-300",
    emerald: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    orange: "border-orange-400/20 bg-orange-500/10 text-orange-300",
  };

  return (
    <div className="rounded-[24px] border p-4" style={{ borderColor: "var(--border-primary)", background: "var(--surface-primary)", boxShadow: "var(--card-shadow)" }}>
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${tones[tone] ?? tones.violet}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-black" style={{ color: "var(--text-primary)" }}>{title}</p>
          <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState("");

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await profileApi.getProfile();
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values) =>
      profileApi.updateProfile({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        occupation: values.occupation?.trim() || null,
        address: values.address?.trim() || null,
        city: values.city?.trim() || null,
        state: values.state?.trim() || null,
        country: values.country?.trim() || null,
        postalCode: values.postalCode?.trim() || null,
        dateOfBirth: values.dateOfBirth || null,
      }),
    onSuccess: (response) => {
      toast.success("Profile updated successfully.");
      queryClient.setQueryData(["profile"], response.data);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to update your profile."));
    },
  });

  const imageUploadMutation = useMutation({
    mutationFn: (file) => profileApi.updateProfileImage(file),
    onSuccess: async () => {
      toast.success("Profile image updated successfully.");
      setSelectedImage(null);
      setPreviewUrl(null);
      setImageError("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to update profile image."));
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => profileApi.resendEmailVerification(),
    onSuccess: () => {
      toast.success("Verification OTP sent successfully.");
      setVerificationModalOpen(true);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to send verification OTP."));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp) => profileApi.verifyEmailOtp(otp),
    onSuccess: async () => {
      toast.success("Email verified successfully.");
      setVerificationModalOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Invalid or expired OTP."));
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSelectImage = (event) => {
    const file = event.target.files?.[0];
    setImageError("");
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Only JPG, PNG and WEBP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Profile image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    const nextPreview = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewUrl(nextPreview);
  };

  const handleClearImage = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setSelectedImage(null);
    setPreviewUrl(null);
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCloseModal = () => {
    if (verifyOtpMutation.isPending || resendMutation.isPending) return;
    setVerificationModalOpen(false);
  };

  if (profileQuery.isLoading) {
    return (
      <div className="min-h-full px-4 py-5 sm:px-6 lg:px-8" style={{ background: "var(--app-background)" }}>
        <div className="mx-auto max-w-[1380px]">
          <LoadingSkeleton className="h-[620px] rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16" style={{ background: "var(--app-background)" }}>
        <div className="w-full max-w-lg rounded-[30px] border p-8 text-center shadow-2xl" style={{ borderColor: "color-mix(in srgb, #f43f5e 28%, var(--border-primary))", background: "var(--surface-primary)" }}>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-500/15 text-rose-300">
            <XCircle className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-black" style={{ color: "var(--text-primary)" }}>Profile unavailable</h1>
          <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
            {getErrorMessage(profileQuery.error, "Your profile could not be loaded.")}
          </p>
          <button
            type="button"
            onClick={() => profileQuery.refetch()}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-slate-950"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const profile = profileQuery.data;
  const completion = calculateProfileCompletion(profile);

  return (
    <>
      <div
        className="page-enter min-h-full px-4 py-4 sm:px-6 lg:px-8 lg:py-5"
        style={{
          background:
            "radial-gradient(circle at 12% 0%, rgba(168,85,247,.10), transparent 28rem), radial-gradient(circle at 92% 8%, rgba(249,115,22,.07), transparent 26rem), var(--app-background)",
          color: "var(--text-primary)",
        }}
      >
        <div className="mx-auto max-w-[1380px]">
          <header className="mb-4 rounded-[28px] border px-5 py-5 backdrop-blur-xl sm:px-6" style={{ borderColor: "var(--border-primary)", background: "color-mix(in srgb, var(--surface-primary) 94%, transparent)", boxShadow: "var(--card-shadow)" }}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 text-white shadow-[0_14px_35px_rgba(168,85,247,.25)]">
                  <UserRound className="h-7 w-7" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: "#c026d3" }}>
                      Identity workspace
                    </p>
                  </div>
                  <h1 className="mt-1 text-2xl font-black sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                    My Profile
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                    Manage your personal information and account details.
                  </p>
                </div>
              </div>
              <CompletionMeter value={completion} />
            </div>

            <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border-primary)" }}>
              {profile.emailVerified ? (
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-black" style={{ color: "#6ee7b7" }}>
                  <ShieldCheck className="h-4 w-4" />
                  Email verified and protected
                </div>
              ) : (
                <div className="flex flex-col gap-3 rounded-[22px] border border-amber-400/20 bg-amber-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-black" style={{ color: "#fde68a" }}>Verify your email address</p>
                    <p className="mt-1 text-xs" style={{ color: "#d6b56d" }}>
                      Verification is required for recovery and sensitive actions.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setVerificationModalOpen(true)}>
                      Enter OTP
                    </Button>
                    <Button loading={resendMutation.isPending} loadingText="Sending..." onClick={() => resendMutation.mutate()}>
                      Send OTP
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid items-start gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
            <div className="space-y-4 xl:sticky xl:top-24">
              <ProfilePhotoCard
                profile={profile}
                previewUrl={previewUrl}
                selectedImage={selectedImage}
                imageError={imageError}
                imageUploading={imageUploadMutation.isPending}
                fileInputRef={fileInputRef}
                onSelectImage={handleSelectImage}
                onClearImage={handleClearImage}
                onUploadImage={() => {
                  if (selectedImage && !imageUploadMutation.isPending) {
                    imageUploadMutation.mutate(selectedImage);
                  }
                }}
              />

              <SupportCard
                icon={ShieldCheck}
                title="Protected identity"
                description="Your profile supports secure recovery and nominee verification workflows."
                tone="emerald"
              />
              <SupportCard
                icon={Sparkles}
                title="Keep details current"
                description="Accurate address and contact details make emergency access safer and faster."
                tone="orange"
              />
            </div>

            <ProfileForm
              profile={profile}
              loading={updateMutation.isPending}
              onSubmit={(values) => updateMutation.mutate(values)}
            />
          </div>
        </div>
      </div>

      <EmailVerificationModal
        open={verificationModalOpen}
        email={profile.email}
        verifying={verifyOtpMutation.isPending}
        resending={resendMutation.isPending}
        onClose={handleCloseModal}
        onVerify={(otp) => verifyOtpMutation.mutate(otp)}
        onResend={() => resendMutation.mutate()}
      />
    </>
  );
}