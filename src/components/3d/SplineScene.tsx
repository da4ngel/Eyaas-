import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Accessible name for the scene. It renders to a <canvas>, which is opaque
   *  to screen readers, so the wrapper carries the description instead. */
  label: string;
}

const SplineScene = ({ scene, className, label }: SplineSceneProps) => {
  return (
    <div className={className} role="img" aria-label={label}>
      <div aria-hidden="true" className="w-full h-full">
        <Spline scene={scene} className="w-full h-full" />
      </div>
    </div>
  );
};

export default SplineScene;
