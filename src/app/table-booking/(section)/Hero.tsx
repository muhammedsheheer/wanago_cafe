const Hero = ({}) => {
  return (
    <section
      id="hero"
      className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-[1.38rem] text-[1.5rem] leading-[110%]"
      style={{
        background:
          "linear-gradient(170deg, rgba(0, 0, 0, 0.00) 7.51%, rgba(0, 0, 0, 0.80) 92.93%), url(/images/about-us/6.jpg) lightgray 50% / cover no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/30" />
      <h1 className="z-40 w-full text-center font-playfair text-5xl leading-[80%] text-[#fae9d2] md:text-[4.75rem]">
        Table Booking
      </h1>
    </section>
  );
};

export default Hero;
