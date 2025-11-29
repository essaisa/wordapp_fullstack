export default function Layout(props){
    const { children } =  props

    return (
        <>
            <header>
                <h1 className="text-gradient">Word Knowledge</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <small>Created by</small>
                <a target="_blank" href="https://github.com/essaisa" className="">  
                    <p>@essaisa</p>  
                    <i class="fa-brands fa-github"></i>
                </a>
            </footer>
        </>
    )
}