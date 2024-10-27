import { atom, selector } from "recoil";

export const outputAtom = atom({
  key: "outputAtom",
  default: {
    type: "run",
    data: [],
    expectedOutput: "",
  },
});

export const resultAtom = atom({
  key: "resultAtom",
  default: false,
});

export const questionAddStatus = atom({
  key: "questionAddStatus",
  default: -1,
});

export const codeRunLoadingState = atom({
  key: "codeRunLoadingState",
  default: false,
});

// submissions atoms

export const submissionResultState = atom({
  key: "submissionResultState",
  default: null,
});

export const activeSubmissionIdState = atom({
  key: "activeSubmissionIdState",
  default: null,
});

export const activeSubmissionResultSelector = selector({
  key: "activeSubmissionResultSelector",
  get: ({ get }) => {
    const activeSubmissionId = get(activeSubmissionIdState);
    const submissionResult = get(submissionResultState);
    return activeSubmissionId && submissionResult
      ? submissionResult[activeSubmissionId]
      : null;
  },
});

export const fetchSubmissionsLoadingState = atom({
  key: "fetchSubmissionsLoadingState",
  default: false,
});
