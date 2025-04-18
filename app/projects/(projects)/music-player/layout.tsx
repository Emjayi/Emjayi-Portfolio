export const metadata = {
    title: "Music Player",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}