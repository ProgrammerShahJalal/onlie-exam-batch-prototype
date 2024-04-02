import { MathJax } from "better-react-mathjax";

const MathjaxEquationPreview = ({ children }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-lg shadow-md">
      <MathJax>{children}</MathJax>
    </div>
  );
};

export default MathjaxEquationPreview;
