export default function InputForm({id, inputData, onChange, ...proprs}) {

    return (
    <section id={id} >
        <div className="input-group">
            <p>
                <label htmlFor={inputData[0].id}>{inputData[0].label}</label>
                <input id={inputData[0].id} type="number" min="0" className="input-group" required onChange={(event) => onChange(event, inputData[0].id)} />
            </p>
            <p>
                <label htmlFor={inputData[1].id}>{inputData[1].label}</label>
                <input id={inputData[1].id} type="number" min="0" className="input-group" required onChange={(event) => onChange(event, inputData[1].id)} />
            </p>
        </div>
        <div className="input-group">
            <p>
                <label htmlFor={inputData[2].id}>{inputData[2].label}</label>
                <input id={inputData[2].id} type="number" min="0" className="input-group" required onChange={(event) => onChange(event, inputData[2].id)} />
            </p>
            <p>
                <label htmlFor={inputData[3].id}>{inputData[3].label}</label>
                <input id={inputData[3].id} type="number" min="0" className="input-group" required onChange={(event) => onChange(event, inputData[3].id)} />
            </p>
        </div>
    </section>
    );
}