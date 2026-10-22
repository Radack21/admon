import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/Components/ui/ThemeProvider'
import AssistantWidget from '@/Components/assistant/AssistantWidget'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <App {...props} />
                <AssistantWidget
                    initialAuthed={Boolean(props.initialPage?.props?.auth?.user)}
                    initialComponent={props.initialPage?.component}
                />
            </ThemeProvider>
        )
    },
})
