export const metadata = {
    title: "Crypto Tracker",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}