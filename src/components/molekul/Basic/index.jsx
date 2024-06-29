import Accordion from '../../atoms/Accordion';

const Basic = () => {
  return (
    <section className="max-w-screen-xl bg-no-repeat bg-cover mx-auto my-20" id="basic">
      <p className="text-4xl text-center">Teori</p>
      <div className="p-4 bg-gray-100 mt-20 rounded shadow-xl border border-black">
        <Accordion title="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form?">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, aperiam!
        </Accordion>
        <Accordion title="Ini item baru">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aspernatur aliquam expedita
          enim asperiores quam molestiae incidunt doloribus consectetur nobis.
        </Accordion>
      </div>
    </section>
  );
};

export default Basic;
