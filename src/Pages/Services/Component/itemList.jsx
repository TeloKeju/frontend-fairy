const itemList = ({ items }) => {

    if (items.length == 0) {
        return (
            <>
                Dongeng Tidak Ada
            </>)
    }
    return (
        <>
            {
                items.map((item) =>
                (
                    < section className="col-lg-4 my-2" key={item.id} >
                        <a href={`/dongeng/detail/${item.id}`} className="text-decoration-none text-dark">
                            <section className="card border-0 mt-3 CardBook_card">
                                <section
                                    className="card-header text-center text-lg-start bg-white p-0 border-0"
                                    style={{
                                        backgroundImage:
                                            "url(https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center bottom",
                                    }}
                                >

                                    <img
                                        // src={`${thumbnail[0].split(',')[0]}, ${thumbnail[0].split(',')[1]}`}
                                        src={item.cover}
                                        className="CardBook_img"
                                        alt=""
                                    />
                                </section>
                                <section className="card-body px-5 px-lg-0 py-2">
                                    <span className="badge rounded-pill bg-danger mt-2">
                                        PDF
                                    </span>
                                    <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                                        PAUD
                                    </span>
                                    <section className="my-2">{item.title}</section>
                                </section>
                            </section>
                        </a>
                    </section >
                )
                )
            }
        </>

    )
}
// (
//     { dongeng.map(item) => (

//     )

// )

export default itemList;