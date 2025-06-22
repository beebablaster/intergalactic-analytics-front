import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop.tsx';
import { HighlightsTable } from '../../components/HighlightsTable/HighlightsTable.tsx';
import { useUpload } from '../../store/uploadSlice';

export const UploaderPage = () => {
  const { report } = useUpload();

  return (
    <>
      <DragAndDrop />
      <HighlightsTable data={report} />
    </>
  );
};
