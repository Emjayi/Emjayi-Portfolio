export const metadata = {
    title: "Color palette generator",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}