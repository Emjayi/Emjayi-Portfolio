export const metadata = {
    title: "Todo List",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}