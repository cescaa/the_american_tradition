import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center ">
      <div className="flex gap-16">
        <div className="flex items-center">
          <div className="font-cor-sc relative w-sm h-56">
            <div className="text-4xl text-tertiary absolute left-8">The</div>
            <div className="text-7xl text-primary absolute top-6">American</div>
            <div className="text-7xl text-primary absolute top-22 left-13">
              Tradition
            </div>
            <p className="absolute top-40 left-18 font-cor">
              Mapping Gun Violence
              <br />
              in America’s Classrooms
            </p>
          </div>
        </div>
        <div className="w-full">
          <div
            className="relative overflow-x-hidden rounded-t-[50%]"
            style={{
              width: 250,
              height: 300,
            }}
          >
            <Image
              src="/img/school-shooting-lockdowns.webp"
              alt="Example image"
              fill
              style={{
                objectFit: "cover", // fills the box, cropping overflow
                objectPosition: "-4rem", // which part of the image to keep
              }}
            />
          </div>
          <small className="text-tertiary">Getty Images</small>
        </div>
      </div>
    </div>
  );
}
