import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getLocale, useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import 'tinymce';

import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/codesample';
import '@edx/tinymce-language-selector';
import './langs/ru';
import './langs/ru-robbo';

import contentUiCss from 'tinymce/skins/ui/oxide/content.css';
import contentCss from 'tinymce/skins/content/default/content.css';

import messages from './messages';

// TinyMCE default list, plus an entry for text without its own font: otherwise the toolbar shows the raw `serif`.
const FONT_FORMATS = 'Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;'
  + 'Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;'
  + 'Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;'
  + 'Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;'
  + 'Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats';

export default function TextEditor(props) {
  const {
    onChange, onKeyUp, onInit, disabled, value,
  } = props;
  const intl = useIntl();

  return (
    <Editor
      initialValue=""
      init={{
        selector: 'textarea#editor',
        height: 600,
        branding: false,
        language: getLocale() === 'ru' ? 'ru' : 'en',
        font_formats: `${intl.formatMessage(messages.editorDefaultFont)}=serif;${FONT_FORMATS}`,
        menubar: 'edit view insert format table tools',
        plugins: 'advlist code link lists table image codesample',
        toolbar:
          'formatselect fontselect bold italic underline forecolor | codesample bullist numlist alignleft aligncenter alignright alignjustify indent | blockquote link image code ',
        skin: false,
        content_css: false,
        content_style: `${contentUiCss.toString()}\n${contentCss.toString()}`,
        extended_valid_elements: 'span[lang|id] -span',
        block_unsupported_drop: false,
        image_advtab: true,
        name: 'emailBody',
        relative_urls: false,
        remove_script_host: false,
      }}
      onEditorChange={onChange}
      value={value}
      onKeyUp={onKeyUp}
      onInit={onInit}
      disabled={disabled}
    />
  );
}

TextEditor.defaultProps = {
  onChange: () => {},
  onKeyUp: () => {},
  onInit: () => {},
  disabled: false,
  value: '',
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onInit: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};
