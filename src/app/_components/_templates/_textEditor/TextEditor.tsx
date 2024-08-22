"use client"

import styles from "./TextEditor.module.css"
import '@/app/tiptap.css'
import {EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react";
import {createLowlight} from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Dropcursor from '@tiptap/extension-dropcursor'
import ListItem from '@tiptap/extension-list-item'
import Color from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Heading from '@tiptap/extension-heading'
import React, {useRef, useState} from "react";
import ColorPallet from "@/app/_components/_organisms/_modals/_colorPallet/ColorPallet";
import useOutsideClick from "@/app/_hooks/useOutsideClick";
import LinkModal from "@/app/_components/_organisms/_modals/_link/LinkModal";
import {OrderedList} from "@tiptap/extension-ordered-list";
import HeadingModal from "@/app/_components/_organisms/_modals/_heading/HeadingModal";
import TipTapCodeBlock from "@/app/_components/_organisms/_tiptap/TipTapCodeBlock";

import bash from 'highlight.js/lib/languages/bash'
import sh from 'highlight.js/lib/languages/shell'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import groovy from 'highlight.js/lib/languages/groovy'
import sql from 'highlight.js/lib/languages/sql'

const lowlight = createLowlight();

lowlight.register('bash', bash);
lowlight.register('sh', sh);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('c', c);
lowlight.register('cpp', cpp);
lowlight.register('java', java);
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('python', python);
lowlight.register('groovy', groovy);
lowlight.register('SQL', sql);

const TextEditor = () => {
    const editor = useEditor({
        extensions: extensions,
        content: content,
    })

    const [activePortal, setActivePortal] = useState<string | null>(null);
    const [portalPosition, setPortalPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

    const Refs = {
        color: useRef<HTMLButtonElement | null>(null),
        highlight: useRef<HTMLButtonElement | null>(null),
        link: useRef<HTMLButtonElement | null>(null),
        heading: useRef<HTMLButtonElement | null>(null),

        portal: useRef<HTMLDivElement | null>(null),
    }

    const PortalFunction = {
        openPortal: (type: keyof typeof Refs) => {
            const buttonRef = Refs[type].current;
            if (buttonRef) {
                const rect = buttonRef.getBoundingClientRect();
                setPortalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
                setActivePortal(type);
            }
        },
        closePortal: () => {
            setActivePortal(null);
        }
    }

    const ColorButtonFunction = {
        onColorSelect: (color: string) => {
            editor?.chain().focus().setColor(color).run();
            PortalFunction.closePortal();
        },
        onColorUnset: () => {
            editor?.chain().focus().unsetColor().run();
            PortalFunction.closePortal();
        }
    }
    const HighlightButtonFunction = {
        onHighlightSelect:  (color: string) => {
            editor?.chain().focus().setHighlight({ color: color }).run();
            PortalFunction.closePortal();
        },
        onHighlightUnset: () => {
            editor?.chain().focus().unsetHighlight().run();
            PortalFunction.closePortal();
        }
    }
    const LinkButtonFunction = {
        onSubmitLink: (data: Record<string, any>) => {
            if(data.url === null) {
                PortalFunction.closePortal();
                return;
            }

            if(data.url == '') {
                editor?.chain().focus().unsetLink().run();
                PortalFunction.closePortal();
                return;
            }

            const urlPattern = /^(https?:\/\/)?([a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,})((\/[^\s]*)*)?$/i;
            let formattedUrl = data.url.trim().toLowerCase();

            if(!urlPattern.test(data.url)) {
                PortalFunction.closePortal();
                return;
            }

            if(!formattedUrl.startsWith('http') || !formattedUrl.startsWith('https')) {
                data.url = 'https://' + data.url;
            }

            editor?.chain().focus().extendMarkRange('link').setLink({ href: data.url }).run();
            PortalFunction.closePortal();
        },
        unsetLink: () => {
            editor?.chain().focus().unsetLink().run();
            PortalFunction.closePortal();
        }
    }
    const HeadingButtonFunction = {
        onHeadingSelect: (level: 1 | 2 | 3 | 4 | 5 | 6) => {
            editor?.chain().focus().toggleHeading({ level: level }).run();
            PortalFunction.closePortal();
        }
    }

    useOutsideClick(Refs.portal, PortalFunction.closePortal);

    if(!editor) {
        return null;
    }

    return (
        <div className={styles.entireWrapper}>
            <div className={styles.menuWrapper}>
                <div className={styles.headingGroup}>
                    <button
                        onClick={() => PortalFunction.openPortal('heading')}
                        className={`${editor.isActive('heading') ? 'is-active' : ''} ${styles.heading}`}
                        style={{filter: editor.isActive('heading') ? 'invert(1)' : ''}}
                        ref={Refs.heading}/>
                    {
                        activePortal === 'heading' && (
                            <HeadingModal
                                onHeadingSelect={HeadingButtonFunction.onHeadingSelect}
                                position={portalPosition}
                                ref={Refs.portal}/>
                        )
                    }
                </div>
                <div className={styles.textButtonGroup}>
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`${editor.isActive('bold') ? 'is-active' : ''} ${styles.bold}`}
                        style={{filter: editor.isActive('bold') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`${editor.isActive('italic') ? 'is-active' : ''} ${styles.italic}`}
                        style={{filter: editor.isActive('italic') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={`${editor.isActive('underline') ? 'is-active' : ''} ${styles.underline}`}
                        style={{filter: editor.isActive('underline') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={`${editor.isActive('strike') ? 'is-active' : ''} ${styles.strike}`}
                        style={{filter: editor.isActive('strike') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => PortalFunction.openPortal('color')}
                        className={`${editor.isActive('textStyle') ? 'is-active' : ''}  ${styles.fontColor}`}
                        style={{filter: editor.isActive('textStyle') ? 'invert(1)' : ''}}
                        ref={Refs.color}/>
                    <button
                        onClick={() => PortalFunction.openPortal('highlight')}
                        className={`${editor.isActive('highlight') ? 'is-active' : ''} ${styles.highlight}`}
                        style={{filter: editor.isActive('highlight') ? 'invert(1)' : ''}}
                        ref={Refs.highlight}/>
                    {
                        activePortal === 'color' && (
                            <ColorPallet
                                onColorUnset={ColorButtonFunction.onColorUnset}
                                onColorSelect={ColorButtonFunction.onColorSelect}
                                position={portalPosition}
                                ref={Refs.portal}/>
                        )
                    }
                    {
                        activePortal === 'highlight' && (
                            <ColorPallet
                                onColorUnset={HighlightButtonFunction.onHighlightUnset}
                                onColorSelect={HighlightButtonFunction.onHighlightSelect}
                                position={portalPosition}
                                ref={Refs.portal}/>
                        )
                    }
                </div>
                <div className={styles.alignButtonGroup}>
                    <button
                        onClick={() => editor?.chain().setTextAlign('left').run()}
                        className={`${editor.isActive({textAlign: 'left'}) ? 'is-active' : ''} ${styles.alignLeft}`}
                        style={{filter: editor.isActive({textAlign: 'left'}) ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().setTextAlign('center').run()}
                        className={`${editor.isActive({textAlign: 'center'}) ? 'is-active' : ''} ${styles.alignCenter}`}
                        style={{filter: editor.isActive({textAlign: 'center'}) ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().setTextAlign('right').run()}
                        className={`${editor.isActive({textAlign: 'right'}) ? 'is-active' : ''} ${styles.alignRight}`}
                        style={{filter: editor.isActive({textAlign: 'right'}) ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().setTextAlign('justify').run()}
                        className={`${editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''} ${styles.alignJustify}`}
                        style={{filter: editor.isActive({textAlign: 'justify'}) ? 'invert(1)' : ''}}/>
                </div>
                <div className={styles.extensionButtonGroup}>
                    <button
                        onClick={() => editor?.chain().toggleBlockquote().run()}
                        className={`${editor.isActive('blockquote') ? 'is-active' : ''} ${styles.blockquote}`}
                        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                        style={{filter: editor.isActive('blockquote') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => PortalFunction.openPortal('link')}
                        className={`${editor.isActive('link') ? 'is-active' : ''} ${styles.link}`}
                        style={{filter: editor.isActive('link') ? 'invert(1)' : ''}}
                        ref={Refs.link}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={`${editor.isActive('bulletList') ? 'is-active' : ''} ${styles.bulletList}`}
                        style={{filter: editor.isActive('bulletList') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={`${editor.isActive('orderedList') ? 'is-active' : ''} ${styles.orderedList}`}
                        style={{filter: editor.isActive('orderedList') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.commands.setHorizontalRule()}
                        className={styles.horizontalRule}
                    />
                    <button
                        onClick={() => editor?.chain().focus().toggleCode().run()}
                        disabled={!editor?.can().chain().focus().toggleCode().run()}
                        className={`${editor.isActive('code') ? 'is-active' : ''} ${styles.code}`}
                        style={{filter: editor.isActive('code') ? 'invert(1)' : ''}}/>
                    <button
                        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
                        className={`${editor.isActive('codeBlock') ? 'is-active' : ''} ${styles.codeBlock}`}
                        style={{filter: editor.isActive('codeBlock') ? 'invert(1)' : ''}}
                    />
                    {
                        activePortal === 'link' && (
                            <LinkModal
                                previousUrl={editor?.getAttributes('link').href}
                                submitUrl={LinkButtonFunction.onSubmitLink}
                                unsetUrl={LinkButtonFunction.unsetLink}
                                position={portalPosition}
                                ref={Refs.portal}/>
                        )
                    }
                </div>
            </div>
            <EditorContent editor={editor}/>
        </div>
    )
}

const extensions = [
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    Code.configure({}),
    CodeBlock.configure(),
    CodeBlockLowlight
        .configure({lowlight})
        .extend({
            addNodeView() {
                return ReactNodeViewRenderer(TipTapCodeBlock)
            },
            addKeyboardShortcuts() {
                return {
                    Tab: () => (this.editor.commands.insertContent('\t')),
                }
            },
        }),
    TextStyle.configure({}),
    TextAlign.configure({types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
    StarterKit.configure({}),
    Underline.configure({}),
    Highlight.configure({ multicolor: true }),
    Link.configure({openOnClick: true, autolink: false}),
    BulletList.configure({}),
    OrderedList.configure({}),
    HorizontalRule.configure({}),
    Heading.configure({levels: [1, 2, 3, 4, 5, 6]}),
    Dropcursor.configure(),
]

const content = "";

export default TextEditor;
