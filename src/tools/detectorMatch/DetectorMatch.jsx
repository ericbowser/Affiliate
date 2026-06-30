import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { questions, TOTAL_QUESTIONS } from './questions.js';
import { recommendDetectors } from './engine.js';
import { getDetectorsForQuiz } from './detectorAttrs.js';
import SEO from '../../components/SEO';

const DetectorMatch = () => {
  const detectors = useMemo(() => getDetectorsForQuiz(), []);
  const [step, setStep] = useState('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const result = useMemo(() => {
    if (step !== 'result') return null;
    return recommendDetectors(detectors, answers);
  }, [step, detectors, answers]);

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === TOTAL_QUESTIONS - 1;

  const handleSelect = (value) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    if (isLastQuestion) {
      setStep('result');
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleBack = () => {
    if (questionIndex === 0) {
      setStep('intro');
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setQuestionIndex(0);
    setStep('intro');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO
        title="Metal Detector Match Quiz"
        description="Answer a few questions and get a personalized metal detector recommendation matched to your budget, terrain, and rockhounding goals."
        path="/tools/detector-match"
      />
      <nav className="text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/category/metal-detectors" className="hover:text-amber-400">Metal Detectors</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Detector Match Quiz</span>
      </nav>

      {step === 'intro' && <IntroScreen onStart={() => setStep('question')} />}
      {step === 'question' && (
        <QuestionScreen
          question={currentQuestion}
          questionIndex={questionIndex}
          selectedValue={answers[currentQuestion.id]}
          onSelect={handleSelect}
          onBack={handleBack}
        />
      )}
      {step === 'result' && result && (
        <ResultScreen result={result} onRetake={handleRetake} />
      )}
    </div>
  );
};

// INTRO
const IntroScreen = ({ onStart }) => (
  <div className="text-center">
    <span className="inline-block bg-amber-900/30 text-amber-400 border border-amber-800/50 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
      Interactive Tool &middot; ~30 seconds
    </span>
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
      Which metal detector should you buy?
    </h1>
    <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
      Answer 6 quick questions about your budget, experience, and where you'll hunt.
      We'll match you with the right detector — with honest reasoning from the field,
      not a sales pitch.
    </p>
    <button
      onClick={onStart}
      className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl text-base font-medium transition-colors"
    >
      Start the quiz &rarr;
    </button>
    <p className="text-xs text-slate-500 mt-6">No email required. We'll show your match instantly.</p>
  </div>
);

// QUESTION
const QuestionScreen = ({ question, questionIndex, selectedValue, onSelect, onBack }) => (
  <div>
    <ProgressBar current={questionIndex + 1} total={TOTAL_QUESTIONS} />
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-8 mb-8">
      {question.label}
    </h2>
    <div className="space-y-3">
      {question.options.map(option => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all ${
              isSelected
                ? 'border-amber-500 bg-amber-900/20'
                : 'border-slate-700 bg-slate-800 hover:border-amber-600 hover:bg-slate-700'
            }`}
          >
            <div className="font-semibold text-slate-100">{option.label}</div>
            {option.hint && (
              <div className="text-sm text-slate-400 mt-1">{option.hint}</div>
            )}
          </button>
        );
      })}
    </div>
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
      >
        &larr; Back
      </button>
      <span className="text-sm text-slate-500">{questionIndex + 1} of {TOTAL_QUESTIONS}</span>
    </div>
  </div>
);

const ProgressBar = ({ current, total }) => (
  <div className="flex gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 flex-1 rounded-full transition-colors ${
          i < current ? 'bg-amber-500' : 'bg-slate-700'
        }`}
      />
    ))}
  </div>
);

// RESULT
const ResultScreen = ({ result, onRetake }) => {
  if (!result.primary) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">
          No detector matches all your requirements.
        </h2>
        <p className="text-slate-400 mb-6">
          Your answers were too restrictive. Try loosening the water or budget filter.
        </p>
        <button
          onClick={onRetake}
          className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <span className="inline-block bg-amber-900/30 text-amber-400 border border-amber-800/50 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
        Your match
      </span>
      <DetectorCard pick={result.primary} isPrimary />

      {result.runnerUp && (
        <>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-12 mb-4">
            Worth considering
          </h3>
          <DetectorCard pick={result.runnerUp} />
        </>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={onRetake}
          className="text-sm text-amber-400 hover:text-amber-300 underline transition-colors"
        >
          Retake the quiz
        </button>
      </div>

      <LegalDisclosure />
    </div>
  );
};

const DetectorCard = ({ pick, isPrimary = false }) => {
  const { detector, matches } = pick;
  return (
    <div className={`bg-slate-800 rounded-2xl border overflow-hidden ${
      isPrimary ? 'border-amber-600 shadow-lg shadow-amber-900/30' : 'border-slate-700'
    }`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className={`font-bold text-slate-100 ${isPrimary ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {detector.name}
          </h2>
          <div className="text-right shrink-0">
            <div className={`font-bold text-amber-400 ${isPrimary ? 'text-2xl' : 'text-lg'}`}>
              {detector.price}
            </div>
            <div className="text-xs text-slate-500">&#9733; {detector.rating}</div>
          </div>
        </div>

        <p className="text-slate-400 italic mb-6">{detector.tagline}</p>

        {matches.length > 0 && (
          <div className="bg-slate-700/50 border border-slate-700 rounded-xl p-4 mb-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Why this matches you
            </div>
            <ul className="space-y-1.5">
              {matches.map((m, i) => (
                <li key={i} className="text-sm text-slate-300 flex">
                  <span className="text-amber-400 mr-2 shrink-0">&#10003;</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isPrimary && (
          <p className="text-slate-300 leading-relaxed mb-6">{detector.pitchAngle}</p>
        )}

        <a
          href={detector.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-xl font-medium text-center transition-colors"
        >
          Check current price &rarr;
        </a>
      </div>
    </div>
  );
};

const LegalDisclosure = () => (
  <p className="text-xs text-slate-500 mt-10 text-center max-w-lg mx-auto leading-relaxed">
    As an Amazon Associate we earn from qualifying purchases at no extra cost to you.
  </p>
);

export default DetectorMatch;
