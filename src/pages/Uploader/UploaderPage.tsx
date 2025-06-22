import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop.tsx';
import { HighlightsTable } from '../../components/HighlightsTable/HighlightsTable.tsx';
import { useUpload } from '../../store/uploadSlice';

export const UploaderPage = () => {
  const { phase, report } = useUpload();

  return (
    <>
      <DragAndDrop />
      {(phase === 'uploading' || phase === 'success') && report && (
        <HighlightsTable data={report} />
      )}
    </>
  );
};
