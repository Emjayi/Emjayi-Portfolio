export const metadata = {
    title: "Habit Tracker",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}