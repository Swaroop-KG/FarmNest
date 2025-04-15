import { motion } from 'framer-motion';
import organicImg from '/public/organic.jpg'; // replace with your actual image path
import NavigationButton from '../../../components/Button';

function NaturalAndOrganic() {
  return (
    <div className="mt-[8vh] px-4 md:px-10 py-10">
      {/* Heading Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-6">Natural and Organic Farming</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Organic farming not only supports the health of our environment but also ensures that the food you consume is free from harmful chemicals. Choosing organic means choosing a healthier, sustainable future.
        </p>
      </motion.section>

      {/* Image and Benefits Section */}
      <motion.div
        className="my-10 flex flex-col-reverse md:flex-row items-center gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <img
            src={organicImg}
            alt="Organic Farming"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 text-lg text-gray-700">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>No Harmful Chemicals:</strong> Organic farming avoids harmful pesticides and fertilizers, making the produce healthier for you.</li>
            <li><strong>Supports Biodiversity:</strong> Organic farming practices promote a balanced ecosystem and protect wildlife.</li>
            <li><strong>Better Soil Health:</strong> Organic farming maintains and enhances soil quality, preventing degradation and erosion.</li>
            <li><strong>Environmental Sustainability:</strong> Organic practices reduce environmental impact by using fewer artificial inputs and supporting regenerative farming practices.</li>
          </ul>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <div className="text-center mt-10">
        <NavigationButton text="Shop Organic Products" path="/shop" />
      </div>
    </div>
  );
}

export default NaturalAndOrganic;
