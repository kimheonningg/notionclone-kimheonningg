import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

import type { CSSProperties } from "react";
import { useEffect, useMemo } from "react";

import { filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { DescriptionOutlined } from "@mui/icons-material";

import { FALLBACK_BLOCKS } from "../../constants/predefinedBlocks";
import type { Page } from "../../types/page";

interface PageEditorProps {
  page: Page;
  onChangeBlocks: (blocks: any) => void;
  onCreateChildPage: () => string; // Make new child page and return id
}

const pageEditorStyles: Record<string, CSSProperties> = {
  wrap: {
    margin: "0 auto",
  },
};

const PageEditor = ({
  page,
  onChangeBlocks,
  onCreateChildPage,
}: PageEditorProps) => {
  const initialBlocks =
    page.blocks && page.blocks.length > 0 ? page.blocks : FALLBACK_BLOCKS;

  const editor = useCreateBlockNote({
    initialContent: initialBlocks,
  });

  // Switch content when page changes
  useEffect(() => {
    const nextBlocks =
      page.blocks && page.blocks.length > 0 ? page.blocks : FALLBACK_BLOCKS;

    editor.replaceBlocks(editor.document, nextBlocks);
  }, [page.id, page.blocks, editor]);

  // Slash menu items
  const slashItems = useMemo(() => {
    const base = getDefaultReactSlashMenuItems(editor);

    const newPageItem = {
      title: "새 페이지",
      aliases: ["page"],
      group: "Navigation",
      icon: <DescriptionOutlined fontSize="small" />,
      subtext: "현재 페이지의 하위 페이지를 만듭니다",
      onItemClick: () => {
        // Find the current block (where the cursor is located)
        const currentBlock = editor.getTextCursorPosition().block;

        // Before moving to the created page, change current block content and save
        editor.updateBlock(currentBlock, {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "📄 새 페이지",
              styles: { bold: true },
            },
          ],
        });

        // Create new page and move
        const newId = onCreateChildPage();
        console.log("created child page", newId);
      },
    };

    return [...base, newPageItem];
  }, [editor, onCreateChildPage]);

  // Editor is changed-> send blocks to the upper component
  useEffect(() => {
    return editor.onChange(() => {
      onChangeBlocks(editor.document);
    });
  }, [editor, onChangeBlocks]);

  return (
    <main style={pageEditorStyles.wrap}>
      <BlockNoteView editor={editor} theme="light" slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => filterSuggestionItems(slashItems, query)}
        />
      </BlockNoteView>
    </main>
  );
};

export default PageEditor;
